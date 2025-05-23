import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessage,
    unsubscribeFromMessages
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // random avatar
const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
const randomAvator = `https://avatar.iran.liara.run/public/${idx}.png`;



  // use to handle state when page reload
  useEffect(() => {
    getMessages(selectedUser._id);   // when select user to message get previous data
    subscribeToMessage()   // start messging and get previous message


  return  ()=>unsubscribeFromMessages() // when user exit then terminate the socket connection


  }, [ getMessages , selectedUser._id , subscribeToMessage , unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView();
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/*map functionality*/}
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    //user message section 
                    message.senderId === authUser._id
                      ? authUser.profilePic || randomAvator  
                      : selectedUser.profilePic || randomAvator
                  }
                  alt={authUser.fullName}
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              {/*showing current time of message send*/}
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;