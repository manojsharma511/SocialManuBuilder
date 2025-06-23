import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { ChatInterface } from "@/components/ChatInterface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Edit,
  MessageSquare,
  Bot,
  Users,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import {
  allUsers,
  aiBotUser,
  mockEnhancedMessages,
  type EnhancedChatMessage,
} from "@/data/mockData";
import { aiService, type AIMessage } from "@/lib/aiService";

interface Chat {
  id: string;
  user: any;
  lastMessage: {
    content: string;
    timestamp: string;
  };
  unreadCount: number;
  isOnline: boolean;
  isAI?: boolean;
}

function ChatList({
  chats,
  onSelectChat,
  selectedChatId,
}: {
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  selectedChatId?: string;
}) {
  return (
    <div className="space-y-0">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={`flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors ${
            selectedChatId === chat.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
          }`}
          onClick={() => onSelectChat(chat)}
        >
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={chat.user.avatar} />
              <AvatarFallback>
                {chat.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {chat.isOnline && !chat.isAI && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            )}
            {chat.isAI && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-white">
                <Bot size={8} className="text-white m-1" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <p className="font-semibold text-sm truncate">
                  {chat.user.username}
                </p>
                {chat.user.isVerified && (
                  <Badge
                    variant="secondary"
                    className="w-3 h-3 p-0 bg-blue-500"
                  >
                    ✓
                  </Badge>
                )}
                {chat.isAI && (
                  <Badge
                    variant="secondary"
                    className="w-3 h-3 p-0 bg-purple-500"
                  >
                    🤖
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {chat.lastMessage.timestamp}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground truncate">
                {chat.lastMessage.content}
              </p>
              {chat.unreadCount > 0 && (
                <Badge
                  className={`text-white text-xs w-5 h-5 p-0 flex items-center justify-center ${
                    chat.isAI ? "bg-purple-500" : "bg-red-500"
                  }`}
                >
                  {chat.unreadCount}
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MessagesInstagram() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<EnhancedChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "friends">("all");
  const [aiSessionId, setAiSessionId] = useState<string>("");

  // Initialize AI session
  useEffect(() => {
    const sessionId = aiService.createSession();
    setAiSessionId(sessionId);
  }, []);

  // Mock chat data with AI bot at the top
  const basechats: Chat[] = [
    {
      id: "ai-chat",
      user: aiBotUser,
      lastMessage: {
        content:
          "Hi! I'm here to help with your social media. Ask me anything! 🤖",
        timestamp: "now",
      },
      unreadCount: 1,
      isOnline: true,
      isAI: true,
    },
    ...allUsers.slice(0, 15).map((user, index) => ({
      id: user.id,
      user,
      lastMessage: {
        content: [
          "Hey! How are you?",
          "Thanks for the follow!",
          "Love your latest post 🔥",
          "Are you free this weekend?",
          "Check out my new project!",
          "Happy birthday! 🎉",
          "Good morning!",
          "See you later!",
          "That's amazing!",
          "Let's catch up soon",
        ][index % 10],
        timestamp: ["2m", "5m", "1h", "2h", "3h", "1d", "2d", "3d", "1w", "2w"][
          index % 10
        ],
      },
      unreadCount: index < 3 ? Math.floor(Math.random() * 5) + 1 : 0,
      isOnline: Math.random() > 0.6,
      isAI: false,
    })),
  ];

  // Filter chats based on search and active tab
  const filteredChats = basechats.filter((chat) => {
    const matchesSearch = chat.user.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (activeTab === "ai") return chat.isAI && matchesSearch;
    if (activeTab === "friends") return !chat.isAI && matchesSearch;
    return matchesSearch;
  });

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);

    if (chat.isAI) {
      // Load AI messages
      const session = aiService.getSession(aiSessionId);
      if (session) {
        const aiMessages: EnhancedChatMessage[] = session.messages.map(
          (msg: AIMessage) => ({
            id: msg.id,
            senderId: msg.isFromAI ? "ai-bot" : "default-user",
            content: msg.content,
            timestamp: msg.timestamp,
            type: msg.type as "text" | "image" | "heart",
            isFromAI: msg.isFromAI,
            status: "read" as const,
          }),
        );
        setMessages(aiMessages);
      }
    } else {
      // Load regular messages
      setMessages([
        ...mockEnhancedMessages.map((msg) => ({
          ...msg,
          senderId: msg.senderId === "1" ? chat.user.id : msg.senderId,
        })),
      ]);
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedChat) return;

    const newMessage: EnhancedChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: "default-user",
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "text",
      status: "sent",
    };

    setMessages((prev) => [...prev, newMessage]);

    if (selectedChat.isAI) {
      // Handle AI response
      setIsTyping(true);

      try {
        const aiResponse = await aiService.sendMessage(aiSessionId, content);
        const aiMessage: EnhancedChatMessage = {
          id: aiResponse.id,
          senderId: "ai-bot",
          content: aiResponse.content,
          timestamp: aiResponse.timestamp,
          type: aiResponse.type as "text" | "image" | "heart",
          isFromAI: true,
          status: "read",
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error getting AI response:", error);
      } finally {
        setIsTyping(false);
      }
    } else {
      // Simulate friend response
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const responses = [
            "That's awesome! 😊",
            "Totally agree with you!",
            "Haha, so true!",
            "Thanks for sharing that!",
            "Let's talk more about this later",
            "Great point!",
            "I love that idea!",
          ];

          const friendResponse: EnhancedChatMessage = {
            id: `msg-${Date.now()}-friend`,
            senderId: selectedChat.user.id,
            content: responses[Math.floor(Math.random() * responses.length)],
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            type: "text",
            status: "read",
          };

          setMessages((prev) => [...prev, friendResponse]);
          setIsTyping(false);
        }, 1500);
      }, 500);
    }
  };

  if (selectedChat) {
    return (
      <div className="h-screen">
        <ChatInterface
          chat={selectedChat}
          onBack={() => setSelectedChat(null)}
          messages={messages}
          onSendMessage={handleSendMessage}
          isTyping={isTyping}
          conversationStarters={
            selectedChat.isAI ? aiService.getConversationStarters() : []
          }
          quickReplies={selectedChat.isAI ? aiService.getQuickReplies() : []}
          isAIChat={selectedChat.isAI}
        />
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-md mx-auto h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-xl font-semibold">manojkumarsharma511</h1>
          <Button variant="ghost" size="icon">
            <Edit size={20} />
          </Button>
        </div>

        {/* Chat Type Tabs */}
        <div className="flex border-b border-gray-100 dark:border-gray-800">
          <Button
            variant={activeTab === "all" ? "default" : "ghost"}
            className="flex-1 rounded-none"
            onClick={() => setActiveTab("all")}
          >
            <MessageSquare size={16} className="mr-2" />
            All
          </Button>
          <Button
            variant={activeTab === "ai" ? "default" : "ghost"}
            className="flex-1 rounded-none"
            onClick={() => setActiveTab("ai")}
          >
            <Bot size={16} className="mr-2" />
            AI Assistant
          </Button>
          <Button
            variant={activeTab === "friends" ? "default" : "ghost"}
            className="flex-1 rounded-none"
            onClick={() => setActiveTab("friends")}
          >
            <Users size={16} className="mr-2" />
            Friends
          </Button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* AI Assistant Highlight (when AI tab is active) */}
        {activeTab === "ai" && (
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-purple-50 dark:bg-purple-900/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500 rounded-full">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-purple-700 dark:text-purple-300">
                  SocialManu AI Assistant
                </h3>
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  Get help with content ideas, growth strategies, and more!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Active Now Section (for friends) */}
        {activeTab !== "ai" && (
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Active now</h3>
            </div>
            <ScrollArea>
              <div className="flex gap-4 pb-2">
                {filteredChats
                  .filter((chat) => chat.isOnline && !chat.isAI)
                  .slice(0, 8)
                  .map((chat) => (
                    <div
                      key={`active-${chat.id}`}
                      className="flex flex-col items-center min-w-0 cursor-pointer"
                      onClick={() => handleSelectChat(chat)}
                    >
                      <div className="relative">
                        <Avatar className="w-14 h-14">
                          <AvatarImage src={chat.user.avatar} />
                          <AvatarFallback>
                            {chat.user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <span className="text-xs mt-1 text-center truncate w-14">
                        {chat.user.username}
                      </span>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Chat List Header */}
        <div className="flex items-center justify-between p-4 pb-2">
          <h3 className="font-semibold text-sm">
            {activeTab === "ai"
              ? "AI Conversations"
              : activeTab === "friends"
                ? "Friends"
                : "Messages"}
          </h3>
          {activeTab === "friends" && (
            <Button variant="ghost" size="sm" className="text-blue-500">
              Requests (2)
            </Button>
          )}
        </div>

        {/* Chat List */}
        <div className="flex-1">
          <ChatList
            chats={filteredChats}
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChat?.id}
          />
        </div>
      </div>
    </AppLayout>
  );
}
