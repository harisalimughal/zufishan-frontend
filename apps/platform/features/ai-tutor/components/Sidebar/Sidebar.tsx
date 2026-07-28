'use client'

import { SidebarStudyAssistant } from "./SidebarStudyAssistant";
import { SidebarConversations } from "./SidebarConversations";
import { SidebarRecommendations } from "./SidebarRecommendations";

export function Sidebar() {
  return (
    <div className="bg-[#111827] border border-[#27272A] rounded-2xl p-4 flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-[#27272A] scrollbar-track-transparent">
      <SidebarStudyAssistant />
      <SidebarConversations />
      <SidebarRecommendations />
    </div>
  )
}