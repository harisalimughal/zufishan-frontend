"use client";

import React from "react";
import { ChatInterface } from "../../../features/ai-assistant";

export default function AiAssistantPage() {
  return (
    <div className="h-[calc(100vh-5.5rem)] min-h-[560px] w-full p-2 sm:p-4">
      <ChatInterface />
    </div>
  );
}
