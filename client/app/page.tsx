"use client";

import useRedirect from "@/hooks/useUserRedirect";
import Sidebar from "./Components/SideBar/SideBar";
import ChatContainer from "./Components/Messages/ChatContainer";

export default function Home() {
  useRedirect("/login");

  return (
    <main className="min-h-screen w-full overflow-hidden bg-slate-950 p-4 text-white">
      <div className="mx-auto flex h-[calc(100vh-2rem)] w-full max-w-7xl min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl md:flex-row">
        <Sidebar />
        <ChatContainer />
      </div>
    </main>
  );
};


