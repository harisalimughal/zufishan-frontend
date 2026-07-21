import { Header } from "./components/Header";
import { ChatInterface } from "./components/ChatInterface";
import { Sidebar } from "./components/Sidebar";

export default function AITutorPage() {
  return (
    <div className="min-h-screen w-full bg-black text-white font-inter flex flex-col">
      <Header />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-4 p-0 lg:p-4 max-w-full mx-auto w-full">
        {/* LEFT - ChatBox */}
        <div className="lg:col-span-8">
          <ChatInterface />
        </div>

        {/* RIGHT - Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}