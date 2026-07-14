import { Server } from "socket.io";
import http from "http";
import express from "express";
import { createClient } from "redis";
import { createAdapter } from "@socket.io/redis-adapter";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
		credentials: true,
	},
});

const redisUrl = process.env.REDIS_URL;

let presenceClient;

if (redisUrl) {
	const pubClient = createClient({ url: redisUrl });
	const subClient = pubClient.duplicate();
	presenceClient = pubClient.duplicate();

	Promise.all([
		pubClient.connect(),
		subClient.connect(),
		presenceClient.connect(),
	])
		.then(() => {
			io.adapter(createAdapter(pubClient, subClient));
			console.log("Socket.IO Redis adapter connected");
		})
		.catch((error) => {
			console.error("Socket.IO Redis adapter error:", error.message);
		});
}

const presenceKey = "online_users";

const getOnlineUsers = async () => {
	if (!presenceClient?.isReady) return [];

	return presenceClient.hKeys(presenceKey);
};

const addUserConnection = async (userId) => {
	if (!presenceClient?.isReady) return;

	await presenceClient.hIncrBy(presenceKey, userId, 1);
};

const removeUserConnection = async (userId) => {
	if (!presenceClient?.isReady) return;

	const remainingConnections = await presenceClient.hIncrBy(
		presenceKey,
		userId,
		-1
	);

	if (remainingConnections <= 0) {
		await presenceClient.hDel(presenceKey, userId);
	}
};

io.on("connection", async (socket) => {
	console.log("User is connected", socket.id);

	const userId = socket.handshake.query.userId;

	if (!userId || userId === "undefined") {
		socket.disconnect(true);
		return;
	}

	socket.join(userId);

	try {
		await addUserConnection(userId);
		io.emit("getOnlineUsers", await getOnlineUsers());
	} catch (error) {
		console.error("Redis presence error:", error.message);
	}

	socket.on("typing", ({ receiverId, senderId, isTyping }) => {
		if (receiverId) {
			io.to(receiverId.toString()).emit("typing", {
				senderId,
				isTyping,
			});
		}
	});

	socket.on("disconnect", async () => {
		console.log("user disconnected", socket.id);

		try {
			await removeUserConnection(userId);
			io.emit("getOnlineUsers", await getOnlineUsers());
		} catch (error) {
			console.error("Redis presence error:", error.message);
		}
	});
});

export { app, io, server };