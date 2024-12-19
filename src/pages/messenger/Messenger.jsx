import PageLayout from "../../layouts/PageLayout";
import { useState } from "react";

const Messenger = () => {
  const [conversations] = useState([
    {
      id: 1,
      name: "Emo Ganjiguur",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Hey, how are you?",
    },
    {
      id: 2,
      name: "Bataa Babo",
      avatar: "https://i.pravatar.cc/150?img=2",
      lastMessage: "Did you see the latest project updates?",
    },
    {
      id: 3,
      name: "Maaraa",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastMessage: "Let's catch up tomorrow!",
    },
    {
      id: 4,
      name: "Senzu",
      avatar: "https://i.pravatar.cc/150?img=4",
      lastMessage: "Thanks for your help! 🙌",
    },
    {
      id: 5,
      name: "Alex Wilson",
      avatar: "https://i.pravatar.cc/150?img=5",
      lastMessage: "Meeting at 3 PM today",
    },
    {
      id: 6,
      name: "Lisa Brown",
      avatar: "https://i.pravatar.cc/150?img=6",
      lastMessage: "Check out this link!",
    },
    {
      id: 7,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=7",
      lastMessage: "Can we reschedule?",
    },
    {
      id: 8,
      name: "Emily Parker",
      avatar: "https://i.pravatar.cc/150?img=8",
      lastMessage: "Let’s have a quick call later.",
    },
    {
      id: 9,
      name: "Chris Jackson",
      avatar: "https://i.pravatar.cc/150?img=9",
      lastMessage: "Great job on the report!",
    },
    {
      id: 10,
      name: "Sophia Taylor",
      avatar: "https://i.pravatar.cc/150?img=10",
      lastMessage: "Don’t forget our meeting tomorrow.",
    },
  ]);

  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({
    1: [
      { id: 1, text: "Hey there!", sender: "other", timestamp: "10:00 AM" },
      { id: 2, text: "Hi! How are you?", sender: "me", timestamp: "10:01 AM" },
    ],
    2: [
      { id: 1, text: "Hello!", sender: "other", timestamp: "9:45 AM" },
      { id: 2, text: "Hi! What's up?", sender: "mejk", timestamp: "9:46 AM" },
    ],
    3: [
      {
        id: 1,
        text: "Hey, are you free?",
        sender: "other",
        timestamp: "10:15 AM",
      },
      {
        id: 2,
        text: "Yes, what’s going on?",
        sender: "me",
        timestamp: "10:16 AM",
      },
    ],
    4: [
      { id: 1, text: "Hello!", sender: "other", timestamp: "9:45 AM" },
      { id: 2, text: "Hi! What's up?", sender: "me", timestamp: "9:46 AM" },
      {
        id: 3,
        text: "Not much, just wanted to say hi.",
        sender: "other",
        timestamp: "9:47 AM",
      },
      {
        id: 4,
        text: "Do you want to meet up for lunch today?",
        sender: "other",
        timestamp: "9:48 AM",
      },
    ],
    5: [
      {
        id: 1,
        text: "Hey, are you free?",
        sender: "other",
        timestamp: "10:15 AM",
      },
      {
        id: 2,
        text: "Yes, what’s going on?",
        sender: "me",
        timestamp: "10:16 AM",
      },
      {
        id: 3,
        text: "I need some help with a project.",
        sender: "other",
        timestamp: "10:17 AM",
      },
      {
        id: 4,
        text: "Sure, I can help. Let’s discuss the details.",
        sender: "me",
        timestamp: "10:18 AM",
      },
    ],
    6: [
      { id: 1, text: "Good morning!", sender: "me", timestamp: "8:00 AM" },
      {
        id: 2,
        text: "Morning! Did you sleep well?",
        sender: "other",
        timestamp: "8:01 AM",
      },
      {
        id: 3,
        text: "Yes, thank you! How about you?",
        sender: "me",
        timestamp: "8:02 AM",
      },
      {
        id: 4,
        text: "Pretty good. Ready for the day?",
        sender: "other",
        timestamp: "8:03 AM",
      },
    ],
    7: [
      {
        id: 1,
        text: "Hey, are you available later?",
        sender: "other",
        timestamp: "1:30 PM",
      },
      { id: 2, text: "Yes, what’s up?", sender: "me", timestamp: "1:31 PM" },
      {
        id: 3,
        text: "I wanted to discuss the report.",
        sender: "other",
        timestamp: "1:32 PM",
      },
    ],
    8: [
      { id: 1, text: "Hi Emily!", sender: "me", timestamp: "11:00 AM" },
      {
        id: 2,
        text: "Hey! Do you have time for a call?",
        sender: "other",
        timestamp: "11:01 AM",
      },
      {
        id: 3,
        text: "Sure, let me finish this task first.",
        sender: "me",
        timestamp: "11:02 AM",
      },
    ],
    9: [
      {
        id: 1,
        text: "Hi Chris, great job on the report!",
        sender: "other",
        timestamp: "2:00 PM",
      },
      {
        id: 2,
        text: "Thanks, I appreciate it!",
        sender: "me",
        timestamp: "2:01 PM",
      },
    ],
    10: [
      {
        id: 1,
        text: "Don’t forget our meeting tomorrow.",
        sender: "other",
        timestamp: "3:00 PM",
      },
      {
        id: 2,
        text: "Got it, I’ll be there.",
        sender: "me",
        timestamp: "3:01 PM",
      },
    ],
  });

  const [newMessage, setNewMessage] = useState("");
  const [conversationSearch, setConversationSearch] = useState(""); // Conversation search state
  const [messageSearch, setMessageSearch] = useState(""); // Message search state

  // Handle sending new messages
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && activeChat) {
      setMessages((prev) => ({
        ...prev,
        [activeChat.id]: [
          ...(prev[activeChat.id] || []),
          {
            id: prev[activeChat.id].length + 1,
            text: newMessage,
            sender: "me",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ],
      }));
      setNewMessage("");
    }
  };

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(conversationSearch.toLowerCase())
  );

  // Filter messages in the active chat based on search query
  const filteredMessages = activeChat
    ? messages[activeChat.id].filter((message) =>
        message.text.toLowerCase().includes(messageSearch.toLowerCase())
      )
    : [];

  return (
    <PageLayout>
      <div className="flex h-full bg-white">
        {/* Sidebar with conversations */}
        <div className="w-[350px] border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Chats</h2>
            <input
              type="text"
              value={conversationSearch}
              onChange={(e) => setConversationSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full p-2 mt-2 border border-gray-200 rounded-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="overflow-y-auto flex-1">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => {
                  setActiveChat(conversation);
                  setMessageSearch(""); // Reset message search on conversation switch
                }}
                className={`flex items-center p-3 hover:bg-gray-100 cursor-pointer active:bg-gray-200 
                  ${activeChat?.id === conversation.id ? "bg-gray-100" : ""}`}
              >
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="text-sm font-semibold">{conversation.name}</h3>
                  <p className="text-xs text-gray-500">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col h-full">
          {activeChat ? (
            <>
              {/* Active chat header */}
              <div className="flex items-center p-3 border-b border-gray-200">
                <img
                  src={activeChat.avatar}
                  alt={activeChat.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <h3 className="font-semibold">{activeChat.name}</h3>
              </div>

              {/* Message search bar */}
              <div className="p-3 border-b border-gray-200">
                <input
                  type="text"
                  value={messageSearch}
                  onChange={(e) => setMessageSearch(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full p-2 border border-gray-200 rounded-full focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Message list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-0">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          message.sender === "me"
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "me"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    No messages found.
                  </div>
                )}
              </div>

              {/* Message input */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-gray-200 flex gap-2"
              >
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-3 border border-gray-200 rounded-full focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <h2>Select a conversation to start messaging</h2>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Messenger;
