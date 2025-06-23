import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Edit,
  Camera,
  Phone,
  Video,
  Info,
  Send,
  Plus,
  Heart,
  Smile,
} from "lucide-react";
import { allUsers } from "@/data/mockData";

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: "text" | "image" | "heart";
}

function ChatList({
  chats,
  onSelectChat,
}: {
  chats: any[];
  onSelectChat: (chat: any) => void;
}) {
  return (
    <div className="space-y-0">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors"
          onClick={() => onSelectChat(chat)}
        >
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={chat.user.avatar} />
              <AvatarFallback>
                {chat.user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {chat.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
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
                <Badge className="bg-red-500 text-white text-xs w-5 h-5 p-0 flex items-center justify-center">
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

function ChatWindow({ chat, onBack }: { chat: any; onBack: () => void }) {
  const [message, setMessage] = useState("");
  const [messages] = useState<ChatMessage[]>([
    {
      id: "1",
      senderId: chat.user.id,
      content: "Hey! How are you doing?",
      timestamp: "2:30 PM",
      type: "text",
    },
    {
      id: "2",
      senderId: "default-user",
      content: "I'm good! Just working on some projects. What about you?",
      timestamp: "2:32 PM",
      type: "text",
    },
    {
      id: "3",
      senderId: chat.user.id,
      content: "Same here! Just finished a new design 🎨",
      timestamp: "2:35 PM",
      type: "text",
    },
    {
      id: "4",
      senderId: "default-user",
      content: "❤️",
      timestamp: "2:36 PM",
      type: "heart",
    },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800">
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
          {chat.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
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
          </div>
          <p className="text-xs text-muted-foreground">
            {chat.isOnline ? "Active now" : "Active 2h ago"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone size={18} />
          </Button>
          <Button variant="ghost" size="icon">
            <Video size={18} />
          </Button>
          <Button variant="ghost" size="icon">
            <Info size={18} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === "default-user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs ${
                  msg.senderId === "default-user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800"
                } rounded-2xl px-4 py-2`}
              >
                {msg.type === "heart" ? (
                  <span className="text-2xl">❤️</span>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Camera size={18} />
          </Button>

          <div className="flex-1 relative">
            <Input
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 text-red-500"
                >
                  <Heart size={14} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MessagesInstagram() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<any>(null);

  // Mock chat data
  const chats = allUsers.slice(0, 15).map((user, index) => ({
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
  }));

  const filteredChats = chats.filter((chat) =>
    chat.user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (selectedChat) {
    return (
      <div className="h-screen">
        <ChatWindow chat={selectedChat} onBack={() => setSelectedChat(null)} />
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

        {/* Suggested/Active Now Section */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Active now</h3>
          </div>
          <ScrollArea>
            <div className="flex gap-4 pb-2">
              {chats
                .filter((chat) => chat.isOnline)
                .slice(0, 8)
                .map((chat) => (
                  <div
                    key={`active-${chat.id}`}
                    className="flex flex-col items-center min-w-0 cursor-pointer"
                    onClick={() => setSelectedChat(chat)}
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

        {/* Chat List */}
        <div className="flex-1">
          <div className="flex items-center justify-between p-4 pb-2">
            <h3 className="font-semibold text-sm">Messages</h3>
            <Button variant="ghost" size="sm" className="text-blue-500">
              Requests (2)
            </Button>
          </div>

          <ChatList chats={filteredChats} onSelectChat={setSelectedChat} />
        </div>
      </div>
    </AppLayout>
  );
}
