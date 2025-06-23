import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Video,
  Info,
  Send,
  Camera,
  Smile,
  Heart,
  Image,
  Mic,
  MoreHorizontal,
  Star,
  ThumbsUp,
  ThumbsDown,
  Copy,
  ChevronRight,
} from "lucide-react";

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: "text" | "image" | "heart" | "typing";
  isFromAI?: boolean;
  reactions?: string[];
  status?: "sent" | "delivered" | "read";
}

interface ChatInterfaceProps {
  chat: any;
  onBack: () => void;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isTyping?: boolean;
  conversationStarters?: string[];
  quickReplies?: string[];
  isAIChat?: boolean;
}

export function ChatInterface({
  chat,
  onBack,
  messages,
  onSendMessage,
  isTyping = false,
  conversationStarters = [],
  quickReplies = [],
  isAIChat = false,
}: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
      setShowQuickReplies(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    onSendMessage(reply);
    setShowQuickReplies(false);
  };

  const handleConversationStarter = (starter: string) => {
    const cleanStarter = starter.replace(/^[🎯💡📈📊✨🤝📱🎨]\s*/, "");
    onSendMessage(cleanStarter);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getMessageStatus = (msg: ChatMessage) => {
    if (msg.senderId === "default-user") {
      switch (msg.status) {
        case "sent":
          return "✓";
        case "delivered":
          return "✓✓";
        case "read":
          return <span className="text-blue-500">✓✓</span>;
        default:
          return "";
      }
    }
    return "";
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={onBack}>
          ←
        </Button>

        <div className="relative">
          <Avatar className="w-10 h-10">
            <AvatarImage src={chat.user.avatar} />
            <AvatarFallback>
              {chat.user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {chat.isOnline && !isAIChat && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
          {isAIChat && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-500 rounded-full border-2 border-white">
              <div className="w-full h-full bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-sm">{chat.user.username}</p>
            {chat.user.isVerified && (
              <Badge variant="secondary" className="w-3 h-3 p-0 bg-blue-500">
                ✓
              </Badge>
            )}
            {isAIChat && (
              <Badge variant="secondary" className="w-3 h-3 p-0 bg-purple-500">
                🤖
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {isAIChat
              ? "AI Assistant • Always available"
              : chat.isOnline
                ? "Active now"
                : "Active 2h ago"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isAIChat && (
            <>
              <Button variant="ghost" size="icon">
                <Phone size={18} />
              </Button>
              <Button variant="ghost" size="icon">
                <Video size={18} />
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon">
            <Info size={18} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Conversation Starters (only show at beginning for AI) */}
          {isAIChat &&
            messages.length <= 1 &&
            conversationStarters.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground text-center">
                  Choose a topic to get started:
                </p>
                <div className="grid gap-2">
                  {conversationStarters.map((starter, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start text-left h-auto p-3 text-sm"
                      onClick={() => handleConversationStarter(starter)}
                    >
                      <span>{starter}</span>
                      <ChevronRight size={16} className="ml-auto" />
                    </Button>
                  ))}
                </div>
              </div>
            )}

          {/* Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === "default-user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md relative group ${
                  msg.senderId === "default-user"
                    ? "bg-blue-500 text-white"
                    : isAIChat
                      ? "bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
                      : "bg-gray-100 dark:bg-gray-800"
                } rounded-2xl px-4 py-2`}
              >
                {/* AI Message Header */}
                {msg.isFromAI && (
                  <div className="flex items-center gap-1 mb-1 text-xs text-purple-600 dark:text-purple-400">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    AI Assistant
                  </div>
                )}

                {msg.type === "heart" ? (
                  <span className="text-2xl">❤️</span>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>

                    {/* Message reactions */}
                    {msg.reactions && msg.reactions.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {msg.reactions.map((reaction, index) => (
                          <span key={index} className="text-xs">
                            {reaction}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Message timestamp and status */}
                <div className="flex items-center justify-between mt-1">
                  <span
                    className={`text-xs ${
                      msg.senderId === "default-user"
                        ? "text-blue-100"
                        : "text-muted-foreground"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                  {msg.senderId === "default-user" && (
                    <span className="text-xs text-blue-100">
                      {getMessageStatus(msg)}
                    </span>
                  )}
                </div>

                {/* AI Message Actions */}
                {msg.isFromAI && (
                  <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 text-purple-500 hover:bg-purple-100"
                    >
                      <ThumbsUp size={12} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 text-purple-500 hover:bg-purple-100"
                    >
                      <ThumbsDown size={12} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 text-purple-500 hover:bg-purple-100"
                    >
                      <Copy size={12} />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2 max-w-xs">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Quick Replies */}
      {showQuickReplies && quickReplies.length > 0 && (
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="whitespace-nowrap"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Camera size={18} />
          </Button>

          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              placeholder={isAIChat ? "Ask me anything..." : "Message..."}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowQuickReplies(quickReplies.length > 0)}
              className="pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <Smile size={14} />
              </Button>
              {message.trim() ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 text-blue-500"
                  onClick={handleSend}
                >
                  <Send size={14} />
                </Button>
              ) : (
                <>
                  {!isAIChat && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 text-gray-500"
                      >
                        <Mic size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 text-red-500"
                      >
                        <Heart size={14} />
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
