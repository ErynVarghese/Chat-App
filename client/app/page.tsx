"use client";

import useRedirect from "@/hooks/useUserRedirect";
import Sidebar from "./Components/SideBar/SideBar";
import ChatContainer from "./Components/Messages/ChatContainer";

export default function Home() {
  useRedirect("/login");

  return (
    <main className="min-h-screen min-w-full bg-slate-950 p-4 text-white">
      <div className="mx-auto flex h-[calc(100vh-2rem)] max-w-7xl flex-col overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl md:flex-row">
        <Sidebar />
        <ChatContainer />
      </div>
    </main>
  );
};


