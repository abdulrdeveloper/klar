"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUp, Bot, ChevronDown, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  free: boolean;
};

const MODELS: Model[] = [
  {
    id: "flash",
    name: "Flash",
    description: "Fast answers, no login needed.",
    badge: "Free",
    free: true,
  },
  {
    id: "smart",
    name: "Smart",
    description: "Deeper reasoning for complex topics.",
    badge: "Balanced",
    free: false,
  },
  {
    id: "thinking",
    name: "Thinking",
    description: "Step-by-step math & problem solving.",
    badge: "Login",
    free: false,
  },
  {
    id: "speed",
    name: "Speed",
    description: "Fastest response for simple queries.",
    badge: "Basic",
    free: false,
  },
  {
    id: "coder",
    name: "Coder",
    description: "Code reviews, debugging, explanations.",
    badge: "Dev",
    free: false,
  },
  {
    id: "deep",
    name: "Deep",
    description: "Long-form, thorough analysis.",
    badge: "Research",
    free: false,
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const sendingRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedModel, setSelectedModel] = useState<Model>(MODELS[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSendMessage = async () => {
    if (input.trim() === "" || isTyping || isRevealing || sendingRef.current) return;

    sendingRef.current = true;
    setErrorMessage(null);
    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("")
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, model: selectedModel.id }),
      });

      if (!response.ok) {
        const fallbackMessage =
          response.status === 503
            ? "Chat service is unavailable right now. Please try again in a moment."
            : "Something went wrong. Please try again.";
        const responseText = await response.text().catch(() => "");
        throw new Error(responseText.trim() || fallbackMessage);
      }

      const text = await response.text();
      setIsTyping(false);
      setIsRevealing(true);
      setMessages([...updatedMessages, { role: "assistant", content: "" }]);

      await revealWords(text, (visibleText) => {
        setMessages([
          ...updatedMessages,
          { role: "assistant", content: visibleText },
        ]);
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Network error. Check your connection.";
      setErrorMessage(message);
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: message },
      ]);
    } finally {
      setIsTyping(false);
      setIsRevealing(false);
      sendingRef.current = false;
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }, [input]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleModelClick = (model: Model) => {
    if (!model.free) {
      router.push("/auth/login");
      return;
    }
    setSelectedModel(model);
    setDropdownOpen(false);
  };

  const isEmpty = messages.length === 0 && !isTyping;

  return (
    <div
      className="flex flex-col h-[100dvh] w-full relative"
      style={{ backgroundColor: "#0f1015" }}
    >
      <div className="absolute top-3 right-4 z-10 flex items-center gap-2">
        <Link
          href="/"
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:text-white"
          style={{
            color: "#6b7280",
            backgroundColor: "#1a1d24",
            border: "1px solid #2a2d34",
          }}
        >
          Home
        </Link>
        <Link
          href="/auth/login"
          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:brightness-110"
          style={{
            background: "linear-gradient(135deg, #d4af37, #c47820)",
            color: "#0f1015",
          }}
        >
          Sign In
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        {errorMessage ? (
          <div className="fixed bottom-[92px] left-1/2 z-20 w-[min(92vw,36rem)] -translate-x-1/2 rounded-xl border px-4 py-3 text-sm shadow-lg"
            style={{ backgroundColor: "#2a1d1d", borderColor: "#5c2b2b", color: "#fecaca" }}
          >
            {errorMessage}
          </div>
        ) : null}
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full px-4 gap-8">
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #c47820)",
                }}
              >
                <Bot size={23} color="#0f1015" />
              </div>

              <div className="text-center">
                <h1
                  className="text-2xl font-semibold tracking-tight"
                  style={{ color: "#e5e7eb" }}
                >
                  What can I help you with?
                </h1>
                <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
                  Ask me anything — I&apos;m here to help.
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
                    style={{
                      background: "linear-gradient(135deg, #d4af37, #c47820)",
                      color: "#0f1015",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #d4af37, #c47820)",
                    }}
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
                  style={{
                    background: "linear-gradient(135deg, #d4af37, #c47820)",
                  }}
                >
                  <Bot size={13} color="#0f1015" />
                </div>
                <div
                  className="px-4 py-3 rounded-2xl rounded-tl-sm"
                  style={{ backgroundColor: "#1a1d24" }}
                >
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{
                          backgroundColor: "#d4af37",
                          animationDelay: `${i * 0.15}s`,
                        }}
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

      <div className="px-4 pb-6 pt-2 max-w-3xl mx-auto w-full">
        <div
          className="rounded-2xl"
          style={{ backgroundColor: "#1a1d24", border: "1px solid #2a2d34" }}
        >
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
              style={{
                color: "#e5e7eb",
                maxHeight: "160px",
                overflowY: "auto",
              }}
            />
          </div>

          <div className="px-3 pb-3 flex items-center justify-between">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer hover:bg-[#2a2d34] transition-colors"
                style={{ color: "#9ca3af" }}
              >
                <Bot size={12} style={{ color: "#d4af37" }} />
                {selectedModel.name}
                <ChevronDown
                  size={12}
                  style={{
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute bottom-full mb-2 left-0 rounded-xl overflow-hidden z-50 w-56"
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
                        onMouseEnter={(e) => {
                          if (!isSelected)
                            e.currentTarget.style.backgroundColor = "#22252e";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = isSelected
                            ? "#2a2d34"
                            : "transparent";
                        }}
                        onClick={() => handleModelClick(model)}
                        className="w-full flex items-start justify-between px-3 py-2 text-left cursor-pointer"
                        style={{
                          backgroundColor: isSelected
                            ? "#2a2d34"
                            : "transparent",
                        }}
                      >
                        <div className="flex flex-col gap-0.5">
                          <span
                            className="text-xs font-medium"
                            style={{
                              color: isSelected ? "#d4af37" : "#e5e7eb",
                            }}
                          >
                            {model.name}
                          </span>
                          <span
                            className="text-[11px]"
                            style={{ color: "#6b7280" }}
                          >
                            {model.description}
                          </span>
                        </div>
                        <div className="ml-3 flex-shrink-0 mt-0.5">
                          {model.free ? (
                            <span
                              className="px-1.5 py-0.5 rounded-full  text-[10px]"
                              style={{
                                backgroundColor: "#d4af3720",
                                color: "#d4af37",
                                border: "1px solid #d4af3740",
                              }}
                            >
                              {model.badge}
                            </span>
                          ) : (
                            <span
                              className="flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px]"
                              style={{
                                backgroundColor: "#2a2d34",
                                color: "#6b7280",
                                border: "1px solid #3a3d44",
                              }}
                            >
                              <Lock size={9} />
                              Sign in
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping || isRevealing}
              className="w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-30"
              style={{ backgroundColor: "#d4af37" }}
            >
              <ArrowUp size={16} color="#0f1015" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
