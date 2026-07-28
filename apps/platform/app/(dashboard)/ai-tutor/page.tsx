import {
  ChatInterface,
  Header,
  TutorRightSidebar
} from "../../../features/ai-tutor";


export default function AiTutorPage() {
  return (
    <div className="flex flex-col space-y-4">
      <Header />
      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ChatInterface />
        </div>
        <div className="lg:col-span-4">
          <TutorRightSidebar />
        </div>
      </div>
    </div>
  );
}

