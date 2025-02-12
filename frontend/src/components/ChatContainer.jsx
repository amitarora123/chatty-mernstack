import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeloton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unSubscribeFromMessages,
  } = useChatStore();
  const messageRef = useRef(null);
  const { authUser } = useAuthStore();

  const fetchMessages = async () => {
    await getMessages(selectedUser._id);
  };
  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
    return () => unSubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unSubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageRef.current && messages)
      messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  if (isMessagesLoading)
    return (
      <div className="flex flex-col flex-1 overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <ChatHeader />
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((messages) => (
          <div
            key={messages._id}
            className={`chat ${
              messages.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageRef}
          >
            <div className="chat-image avatar">
              <div className="border rounded-full size-10">
                <img
                  src={
                    messages.senderId === authUser._id
                      ? authUser.profilePic || "/avtar.png"
                      : selectedUser.profilePic || "/avtar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="mb-1 chat-header">
              <time className="ml-1 text-xs opacity-50">
                {formatMessageTime(messages.createdAt)}
              </time>
            </div>
            <div className="flex flex-col chat-bubble">
              {messages.image && (
                <img
                  src={messages.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {messages.text && <p>{messages.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput fetchMessages={fetchMessages} />
    </div>
  );
};

export default ChatContainer;
