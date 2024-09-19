import React, { useState, useRef, useEffect, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import "@radix-ui/themes/styles.css";
import Message from "./message";

const MyDialog = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you today?",
      type: "received",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);
  const messageListRef = useRef(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  const handleSend = useCallback(() => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, type: "sent", timestamp: new Date() },
      ]);
      setInput("");
    }
  }, [input]);

  // Scroll to bottom logic
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle user scrolling up
  const handleScroll = () => {
    const messageList = messageListRef.current;
    if (messageList) {
      const isAtBottom =
        messageList.scrollHeight - messageList.scrollTop ===
        messageList.clientHeight;
      setIsScrolledUp(!isAtBottom);
    }
  };

  useEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) {
      messageList.addEventListener("scroll", handleScroll);
      return () => {
        messageList.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <Button
        style={{
          position: "absolute",
          bottom: "41px",
          right: "49px",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      >
        <Image src="/assets/chat.svg" width={40} height={40} alt="Chat Icon" />
      </Button>
      <Dialog.Root open={true} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Content className="dialog-content">
            {/* Dialog Title */}
            <Dialog.Title
              style={{
                background: "#F4F6F7",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 23px 17px 24px",
                height: "55px",
                borderRadius: "24px 24px 0 0",
                boxShadow: "0px 1px 4px 0px #00000040",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/assets/breadcumb.svg"
                  width={14}
                  height={7}
                  alt="Chat Icon"
                  style={{ marginRight: "24px" }}
                />
                <Image
                  src="/assets/icon.png"
                  width={13}
                  height={22}
                  alt="Chat Icon"
                  style={{ marginRight: "9px" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h1
                    style={{
                      fontWeight: "600px",
                      fontSize: "10px",
                      lineHeight: "12px",
                    }}
                  >
                    Kittosoft ChatBot
                  </h1>
                  <p
                    style={{
                      fontWeight: "500px",
                      fontSize: "6px",
                      lineHeight: "7.5px",
                    }}
                  >
                    How can we help?
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "baseline",
                }}
              >
                <Image
                  src="/assets/refresh-circle.svg"
                  width={16}
                  height={16}
                  alt="Refresh Icon"
                />
                <Button
                  onClick={() => setOpen(false)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    fontSize: "24px",
                    color: "#000",
                    marginLeft: "15px",
                  }}
                >
                  &times;
                </Button>
              </div>
            </Dialog.Title>

            {/* Messages */}
            <div
              ref={messageListRef}
              style={{
                flex: 1,
                padding: "10px 0",
                overflowY: "auto",
              }}
            >
              {messages.map((msg, index) => {
                const isLastSentMessage =
                  msg.type === "sent" &&
                  index === messages.map((m) => m.type).lastIndexOf("sent");
                return (
                  <Message
                    key={index}
                    type={msg.type}
                    timestamp={msg.timestamp}
                    text={msg.text}
                    isLastSentMessage={isLastSentMessage}
                  />
                );
              })}

              <div ref={messageEndRef} />
              {/* Popover for scroll-to-bottom */}
              {isScrolledUp && (
                <Popover.Root data-testid="hello">
                  <Popover.Trigger asChild>
                    <Button
                      style={{
                        position: "fixed",
                        bottom: "80px",
                        right: "30px",
                        background: "#323232",
                        color: "#fff",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={scrollToBottom}
                    >
                      <Image
                        src="/assets/chevron-down.svg"
                        width={16}
                        height={16}
                        alt="Scroll Down"
                      />
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content
                    side="top"
                    align="center"
                    style={{
                      padding: "8px",
                      backgroundColor: "#f1f1f1",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      fontSize: "12px",
                    }}
                  >
                    New messages below
                  </Popover.Content>
                </Popover.Root>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                borderRadius: "12px",
                width: "489px",
                height: "71px",
                padding: "8px",
                margin: "0 24px 12px",
                backgroundColor: "#EBECEE",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // height: "100%",
                  // padding: "8px",
                  gap: "20px",
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  style={{
                    outline: "none",
                    fontSize: "11px",
                    width: "100%",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                />
                {/* Buttons */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      style={{
                        border: "none",
                        background: " #FFFFFF",
                        cursor: "pointer",
                        fontSize: "20px",
                        color: "#000",
                        marginRight: "6px",
                        borderRadius: "4px",
                      }}
                    >
                      <Image
                        src="/assets/plus.svg"
                        width={22}
                        height={22}
                        alt="Plus Icon"
                      />
                    </Button>
                    <Button
                      style={{
                        border: "none",
                        cursor: "pointer",
                        fontSize: "20px",
                        color: "#000",
                        marginRight: "6px",
                      }}
                    >
                      <Image
                        src="/assets/magic.svg"
                        width={12}
                        height={12}
                        alt="Magic Icon"
                      />
                    </Button>
                    <Button
                      style={{
                        border: "none",
                        cursor: "pointer",
                        color: "#000",
                        marginRight: "6px",
                      }}
                    >
                      <Image
                        src="/assets/Link.svg"
                        width={9}
                        height={9}
                        alt="Link Icon"
                      />
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={handleSend}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "7px",
                        borderRadius: "8px",
                        background: "#323232",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        width: "60px",
                        height: "26px",
                      }}
                    >
                      <Image
                        src="/assets/rocket.svg"
                        width={13}
                        height={13}
                        alt="Rocket Icon"
                      />
                      <span style={{ margin: "0 8px" }}>
                        <Image
                          src="/assets/Rectangle.svg"
                          width={1}
                          height={16}
                          alt="Rectangle"
                        />
                      </span>
                      <Image
                        src="/assets/ChevronCircleDown.svg"
                        width={7}
                        height={3}
                        alt="Chevron Circle Down"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default MyDialog;
