"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  Bot,
  ChevronDown,
  Plus,
  MessageSquare,
  Trash2,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { revealWords } from "@/lib/typewriter";
import MarkdownMessage from "@/app/components/MarkdownMessage";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Model = {
  id: string;
  name: string;
  description: string;
  badge: string;
};

type Chat = {
  id: string;
  title: string;
  messages: Message[];
};

const MODELS: Model[] = [
  { id: "flash", name: "Flash", description: "Fast answers for quick questions.", badge: "Fast" },
  { id: "smart", name: "Smart", description: "Deeper reasoning for complex topics.", badge: "Balanced" },
  { id: "thinking", name: "Thinking", description: "Step-by-step math & problem solving.", badge: "Reasoning" },
  { id: "speed", name: "Speed", description: "Fastest response for simple queries.", badge: "Basic" },
  { id: "coder", name: "Coder", description: "Code reviews, debugging, explanations.", badge: "Dev" },
  { id: "deep", name: "Deep", description: "Long-form, thorough analysis.", badge: "Research" },
];

const GOLD = "linear-gradient(135deg, #d4af37, #c47820)";

export default function DashboardPage() {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [chats, setChats] = useState<Chat[]>([
    { id: "c1", title: "New chat", messages: [] },
  ]);
  const [activeChatId, setActiveChatId] = useState<string>("c1");
  const activeChat = chats.find((c) => c.id === activeChatId) ?? chats[0];
  const messages = activeChat?.messages ?? [];

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [selectedModel, setSelectedModel] = useState<Model>(MODELS[0]);
  const [modelOpen, setModelOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const firstLetter = (currentUser?.name.trim().charAt(0) || "U").toUpperCase();

  const updateActiveChat = (updater: (c: Chat) => Chat) => {
    setChats((prev) => prev.map((c) => (c.id === activeChatId ? updater(c) : c)));
  };

  const handleSendMessage = async () => {
    if (input.trim() === "" || isTyping || isRevealing) return;

    const controller = new AbortController();
    abortControllerRef.current = controller;
    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    updateActiveChat((c) => ({
      ...c,
      title: c.messages.length === 0 ? input.slice(0, 30) : c.title,
      messages: updatedMessages,
    }));
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ messages: updatedMessages, model: selectedModel.id }),
      });

      if (!response.ok || !response.body) {
        setIsTyping(false);
        updateActiveChat((c) => ({
          ...c,
          messages: [...updatedMessages, { role: "assistant", content: "Something went wrong. Please try again." }],
        }));
        return;
      }

      const text = await response.text();
      setIsTyping(false);
      setIsRevealing(true);
      updateActiveChat((c) => ({
        ...c,
        messages: [...updatedMessages, { role: "assistant", content: "" }],
      }));

      await revealWords(text, (visibleText) => {
        updateActiveChat((c) => ({
          ...c,
          messages: [...updatedMessages, { role: "assistant", content: visibleText }],
        }));
      }, { signal: controller.signal });
    } catch {
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      setIsTyping(false);
      updateActiveChat((c) => ({
        ...c,
        messages: [...updatedMessages, { role: "assistant", content: "Network error. Check your connection." }],
      }));
    } finally {
      setIsTyping(false);
      setIsRevealing(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopGeneration = () => {
    abortControllerRef.current?.abort();
  };

  useEffect(() => {
  fetch("/api/me")
    .then((res) => {
      if (!res.ok) throw new Error("Not authenticated");
      return res.json();
    })
    .then((data) => {
      setCurrentUser(data.user);
      setCheckingAuth(false);
    })
    .catch(() => {
      router.push("/auth/login");
    });
}, [router]);



  const handleNewChat = () => {
    const id = `c${Date.now()}`;
    setChats((prev) => [{ id, title: "New chat", messages: [] }, ...prev]);
    setActiveChatId(id);
    setSidebarOpen(false);
  };

  const handleDeleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setChats((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (next.length === 0) {
        const fresh = { id: `c${Date.now()}`, title: "New chat", messages: [] };
        setActiveChatId(fresh.id);
        return [fresh];
      }
      if (id === activeChatId) setActiveChatId(next[0].id);
      return next;
    });
  };

  const handleLogout = async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  router.push("/auth/login");
};
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }, [input]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modelRef.current && !modelRef.current.contains(e.target as Node)) setModelOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isEmpty = messages.length === 0 && !isTyping;

  if (checkingAuth || !currentUser) {
  return (
    <div className="flex h-[100dvh] w-full items-center justify-center" style={{ backgroundColor: "#0f1015" }}>
      <Bot size={32} color="#d4af37" className="animate-pulse" />
    </div>
  );
}

  return (
    <div className="flex h-[100dvh] w-full" style={{ backgroundColor: "#0f1015" }}>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-40 h-full w-64 flex flex-col transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ backgroundColor: "#12141b", borderRight: "1px solid #2a2d34" }}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: GOLD }}
            >
              <Bot size={16} color="#0f1015" />
            </div>
            <span className="text-sm font-semibold" style={{ color: "#e5e7eb" }}>
              Klar AI
            </span>
          </div>
          <button
            className="md:hidden p-1 rounded hover:bg-[#1a1d24]"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={16} color="#9ca3af" />
          </button>
        </div>

        <div className="px-3">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all hover:brightness-110"
            style={{ background: GOLD, color: "#0f1015" }}
          >
            <Plus size={14} />
            New Chat
          </button>
        </div>

        <div className="px-3 pt-5 pb-2 text-[11px] uppercase tracking-wider" style={{ color: "#6b7280" }}>
          History
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-1">
          {chats.map((chat) => {
            const active = chat.id === activeChatId;
            return (
              <div
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  setSidebarOpen(false);
                }}
                className="group flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-colors"
                style={{
                  backgroundColor: active ? "#1f2229" : "transparent",
                  border: active ? "1px solid #2a2d34" : "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = "#181b22";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <MessageSquare
                  size={13}
                  style={{ color: active ? "#d4af37" : "#6b7280", flexShrink: 0 }}
                />
                <span
                  className="text-xs truncate flex-1"
                  style={{ color: active ? "#e5e7eb" : "#9ca3af" }}
                >
                  {chat.title || "New chat"}
                </span>
                <button
                  onClick={(e) => handleDeleteChat(chat.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[#2a2d34] transition-opacity"
                >
                  <Trash2 size={11} color="#6b7280" />
                </button>
              </div>
            );
          })}
        </div>

        <div
          className="px-3 py-3"
          style={{ borderTop: "1px solid #2a2d34" }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: GOLD, color: "#0f1015" }}
            >
              {firstLetter}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium truncate" style={{ color: "#e5e7eb" }}>
                {currentUser?.name}
              </div>
              <div className="text-[11px] truncate" style={{ color: "#6b7280" }}>
                {currentUser?.email}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 relative">
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "1px solid #1a1d24" }}
        >
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-[#1a1d24]"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={16} color="#9ca3af" />
            </button>

            <div className="relative" ref={modelRef}>
              <button
                onClick={() => setModelOpen((p) => !p)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[#1a1d24] transition-colors"
                style={{ color: "#e5e7eb", border: "1px solid #2a2d34" }}
              >
                <Bot size={12} style={{ color: "#d4af37" }} />
                {selectedModel.name}
                <ChevronDown
                  size={12}
                  style={{
                    transform: modelOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </button>

              {modelOpen && (
                <div
                  className="absolute top-full mt-2 left-0 rounded-xl overflow-hidden z-50 w-64"
                  style={{
                    backgroundColor: "#1a1d24",
                    border: "1px solid #2a2d34",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  }}
                >
                  {MODELS.map((model) => {
                    const isSelected = model.id === selectedModel.id;
                    return (
                      <button
                        key={model.id}
                        onClick={() => {
                          setSelectedModel(model);
                          setModelOpen(false);
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = "#22252e";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = isSelected ? "#2a2d34" : "transparent";
                        }}
                        className="w-full flex items-start justify-between px-3 py-2 text-left"
                        style={{ backgroundColor: isSelected ? "#2a2d34" : "transparent" }}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span
                            className="text-xs font-medium"
                            style={{ color: isSelected ? "#d4af37" : "#e5e7eb" }}
                          >
                            {model.name}
                          </span>
                          <span className="text-[11px]" style={{ color: "#6b7280" }}>
                            {model.description}
                          </span>
                        </div>
                        <span
                          className="ml-3 flex-shrink-0 mt-0.5 px-1.5 py-0.5 rounded-full text-[10px]"
                          style={{
                            backgroundColor: "#d4af3720",
                            color: "#d4af37",
                            border: "1px solid #d4af3740",
                          }}
                        >
                          {model.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="relative" ref={userRef}>
            <button
              onClick={() => setUserMenuOpen((p) => !p)}
              className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full hover:bg-[#1a1d24] transition-colors"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: GOLD, color: "#0f1015" }}
              >
                {firstLetter}
              </div>
              <ChevronDown size={12} color="#9ca3af" />
            </button>

            {userMenuOpen && (
              <div
                className="absolute top-full mt-2 right-0 rounded-xl overflow-hidden z-50 w-56"
                style={{
                  backgroundColor: "#1a1d24",
                  border: "1px solid #2a2d34",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                <div className="px-3 py-3" style={{ borderBottom: "1px solid #2a2d34" }}>
                  <div className="text-xs font-semibold" style={{ color: "#e5e7eb" }}>
                    {currentUser?.name}
                  </div>
                  <div className="text-[11px] mt-0.5" style={{ color: "#6b7280" }}>
                    {currentUser?.email}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left hover:bg-[#22252e]"
                  style={{ color: "#e5e7eb", borderTop: "1px solid #2a2d34" }}
                >
                  <LogOut size={13} style={{ color: "#d4af37" }} />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full px-4 gap-8">
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: GOLD }}
                >
                  <Bot size={23} color="#0f1015" />
                </div>
                <div className="text-center">
                  <h1 className="text-2xl font-semibold tracking-tight" style={{ color: "#e5e7eb" }}>
                    Welcome back, {currentUser?.name.split(" ")[0]}
                  </h1>
                  <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
                    Pick a model and start a new conversation.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-4 py-6 space-y-4 max-w-3xl mx-auto w-full">
              {messages.map((msg, index) =>
                msg.role === "user" ? (
                  <div key={index} className="flex justify-end">
                    <div
                      className="max-w-[72%] px-4 py-3 rounded-2xl rounded-tr-sm text-sm leading-relaxed whitespace-pre-wrap"
                      style={{ background: GOLD, color: "#0f1015" }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: GOLD }}
                    >
                      <Bot size={13} color="#0f1015" />
                    </div>
                    <div
                      className="max-w-[72%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed"
                      style={{ backgroundColor: "#1a1d24", color: "#e5e7eb" }}
                    >
                      <MarkdownMessage content={msg.content} />
                    </div>
                  </div>
                ),
              )}
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: GOLD }}
                  >
                    <Bot size={13} color="#0f1015" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm" style={{ backgroundColor: "#1a1d24" }}>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{ backgroundColor: "#d4af37", animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="px-4 pb-6 pt-2 max-w-3xl mx-auto w-full">
          <div className="rounded-2xl" style={{ backgroundColor: "#1a1d24", border: "1px solid #2a2d34" }}>
            <div className="px-4 pt-3 pb-2">
              <textarea
                rows={1}
                ref={textareaRef}
                value={input}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="w-full bg-transparent outline-none text-sm resize-none leading-relaxed"
                style={{ color: "#e5e7eb", maxHeight: "160px", overflowY: "auto" }}
              />
            </div>

            <div className="px-3 pb-3 flex items-center justify-between">
              <span className="text-[11px]" style={{ color: "#6b7280" }}>
                Using <span style={{ color: "#d4af37" }}>{selectedModel.name}</span>
              </span>
              <button
                onClick={isTyping || isRevealing ? handleStopGeneration : handleSendMessage}
                disabled={!input.trim() && !isTyping && !isRevealing}
                className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30"
                style={{ backgroundColor: isTyping || isRevealing ? "#2a2d34" : "#d4af37" }}
                aria-label={isTyping || isRevealing ? "Stop generation" : "Send message"}
              >
                {isTyping || isRevealing ? (
                  <X size={16} color="#e5e7eb" />
                ) : (
                  <ArrowUp size={16} color="#0f1015" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
