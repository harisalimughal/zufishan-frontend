import {
  ChatInterface,
  TutorRightSidebar
} from "../../../features/ai-tutor";


export default function AiTutorPage() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="h-[75vh] min-h-[520px] lg:col-span-8 lg:h-auto lg:min-h-0">
          <ChatInterface />
        </div>
        <div className="hidden lg:col-span-4 lg:block">
          <TutorRightSidebar />
        </div>
      </div>
    </div>
  );
}

