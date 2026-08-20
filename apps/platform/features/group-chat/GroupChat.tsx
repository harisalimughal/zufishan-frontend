"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Users, Search } from "lucide-react";
import { messagingService } from "@/services/messagingService";

type GroupMessage = {
  id: string;
  author: string;
  avatarColor: string;
  content: string;
  time: string;
  isMe?: boolean;
};

type Group = {
  id: string;
  name: string;
  members: number;
  avatarColor: string;
  messages: GroupMessage[];
};

const REPLIERS = [
  { name: "Sarah K.", avatarColor: "#EC4899" },
  { name: "Michael T.", avatarColor: "#F59E0B" },
  { name: "Priya M.", avatarColor: "#22C55E" },
];

const REPLY_TEXTS = [
  "Good point, thanks for sharing!",
  "I was wondering about that too 🙌",
  "Can you elaborate a bit more?",
  "Makes sense, thanks!",
];

const INITIAL_GROUPS: Group[] = [
  {
    id: "db101",
    name: "Tajweed Foundations Study Group",
    members: 24,
    avatarColor: "#10b981",
    messages: [
      { id: "1", author: "Sarah K.", avatarColor: "#EC4899", content: "Anyone free to review 3NF together before the quiz?", time: "09:12 AM" },
      { id: "2", author: "Michael T.", avatarColor: "#F59E0B", content: "I'm in! Let's do a call after class.", time: "09:14 AM" },
    ],
  },
  {
    id: "ai-eng",
    name: "Hadith Sciences Cohort",
    members: 41,
    avatarColor: "#059669",
    messages: [
      { id: "1", author: "Priya M.", avatarColor: "#22C55E", content: "Posted the assignment notes in Smart Notes, check it out.", time: "08:40 AM" },
    ],
  },
  {
    id: "dsa",
    name: "Study Buddies - Fiqh",
    members: 12,
    avatarColor: "#22C55E",
    messages: [
      { id: "1", author: "James L.", avatarColor: "#10b981", content: "Binary tree traversal practice set is up, who's joining?", time: "Yesterday" },
    ],
  },
];

function getTime(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function AvatarCircle({ initials, color, size = 36 }: { initials: React.ReactNode; color: string; size?: number }) {
  return (
    <div
      style={{ width: size, height: size, minWidth: size, background: color, fontSize: size * 0.34 }}
      className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
    >
      {initials}
    </div>
  );
}

export function GroupChat() {
  const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS);
  const [activeGroupId, setActiveGroupId] = useState(INITIAL_GROUPS[0].id);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextIdRef = useRef(100);

  const activeGroup = groups.find((g) => g.id === activeGroupId) ?? groups[0];

  useEffect(() => {
    async function loadChannelMessages() {
      try {
        const liveMsgs = await messagingService.getChannelMessages(activeGroupId);
        if (liveMsgs && liveMsgs.length > 0) {
          const mapped: GroupMessage[] = liveMsgs.map((m: any) => ({
            id: m.id,
            author: m.sender?.fullName || "Student",
            avatarColor: "#10b981",
            content: m.content,
            time: new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isMe: false,
          }));
          setGroups((prev) =>
            prev.map((g) => (g.id === activeGroupId ? { ...g, messages: [...g.messages, ...mapped] } : g))
          );
        }
      } catch (err) {
        // Keep current channel messages
      }
    }
    loadChannelMessages();
  }, [activeGroupId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeGroup?.messages.length, activeGroupId]);

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const myMessage: GroupMessage = {
      id: `${nextIdRef.current++}`,
      author: "You",
      avatarColor: "#059669",
      content: text,
      time: getTime(),
      isMe: true,
    };

    setGroups((prev) =>
      prev.map((g) => (g.id === activeGroupId ? { ...g, messages: [...g.messages, myMessage] } : g))
    );
    setInput("");

    try {
      await messagingService.sendGroupMessage(activeGroupId, "current-user", text);
    } catch (err) {
      // Offline fallback
    }

    const replier = REPLIERS[Math.floor(Math.random() * REPLIERS.length)];
    const replyText = REPLY_TEXTS[Math.floor(Math.random() * REPLY_TEXTS.length)];
    setTimeout(() => {
      const reply: GroupMessage = {
        id: `${nextIdRef.current++}`,
        author: replier.name,
        avatarColor: replier.avatarColor,
        content: replyText,
        time: getTime(),
      };
      setGroups((prev) =>
        prev.map((g) => (g.id === activeGroupId ? { ...g, messages: [...g.messages, reply] } : g))
      );
    }, 1500);
  };

  return (
    <div className="h-full flex bg-[#111827] border border-[#27272A] rounded-2xl overflow-hidden">
      {/* Groups list */}
      <div className="w-72 flex-shrink-0 border-r border-[#27272A] flex flex-col">
        <div className="p-4 border-b border-[#27272A]">
          <h2 className="text-lg font-bold text-white mb-3">Group Chat</h2>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search groups..."
              className="w-full bg-[#09090B] border border-[#27272A] rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-[#10b981] transition"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredGroups.map((group) => {
            const lastMessage = group.messages[group.messages.length - 1];
            const isActive = group.id === activeGroupId;
            return (
              <button
                key={group.id}
                onClick={() => setActiveGroupId(group.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-l-2 ${
                  isActive ? "bg-[#1F2937] border-l-[#10b981]" : "border-l-transparent hover:bg-[#1F2937]/50"
                }`}
              >
                <AvatarCircle initials={<Users size={16} />} color={group.avatarColor} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{group.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {lastMessage ? `${lastMessage.author === "You" ? "You" : lastMessage.author}: ${lastMessage.content}` : "No messages yet"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active group chat */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b border-[#27272A]">
          <AvatarCircle initials={<Users size={18} />} color={activeGroup.avatarColor} size={40} />
          <div>
            <h3 className="text-sm font-semibold text-white">{activeGroup.name}</h3>
            <p className="text-xs text-gray-500">{activeGroup.members} members</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {activeGroup.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-3 ${msg.isMe ? "flex-row-reverse" : ""}`}
            >
              <AvatarCircle initials={msg.author.slice(0, 1)} color={msg.avatarColor} size={32} />
              <div className={`max-w-md ${msg.isMe ? "items-end" : "items-start"} flex flex-col`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs font-semibold text-gray-300">{msg.isMe ? "You" : msg.author}</span>
                  <span className="text-[10px] text-gray-600">{msg.time}</span>
                </div>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.isMe ? "bg-[#10b981] text-white" : "bg-[#1F2937] border border-[#27272A] text-gray-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 border-t border-[#27272A] flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={`Message ${activeGroup.name}...`}
            className="flex-1 bg-[#09090B] border border-[#27272A] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#10b981] transition"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-[#10b981] px-5 rounded-xl flex items-center justify-center hover:bg-primary-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
