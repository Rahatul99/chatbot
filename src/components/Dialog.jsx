import React, { useState, useRef, useEffect, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
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

  const handleSend = useCallback(() => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, type: "sent", timestamp: new Date() },
      ]);
      setInput("");
    }
  }, [input]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        <Image
          src="/assets/chaticon.png"
          width={40}
          height={40}
          alt="Chat Icon"
        />
      </Button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Content className="dialog-content">
            {/* Dialog Title */}
            <Dialog.Title
              style={{
                borderBottom: "1px solid #ddd",
                background: "#f1f1f1",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginRight: "20px" }}>
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 4C2.22386 4 2 4.22386 2 4.5C2 4.77614 2.22386 5 2.5 5H12.5C12.7761 5 13 4.77614 13 4.5C13 4.22386 12.7761 4 12.5 4H2.5ZM2 7.5C2 7.22386 2.22386 7 2.5 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H2.5C2.22386 8 2 7.77614 2 7.5ZM2 10.5C2 10.2239 2.22386 10 2.5 10H12.5C12.7761 10 13 10.2239 13 10.5C13 10.7761 12.7761 11 12.5 11H2.5C2.22386 11 2 10.7761 2 10.5Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <Image
                  src="/assets/icon.png"
                  width={13}
                  height={12}
                  alt="Chat Icon"
                  style={{ marginRight: "10px" }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    lineHeight: "1",
                  }}
                >
                  <h1 style={{ fontWeight: "600px", fontSize: "12px" }}>
                    Kittosoft ChatBot
                  </h1>
                  <p style={{ fontWeight: "500px", fontSize: "8px" }}>
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
                    marginLeft: "10px",
                  }}
                >
                  &times;
                </Button>
              </div>
            </Dialog.Title>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                padding: "10px 24px",
                overflowY: "auto",
              }}
            >
              {messages.map((msg, index) => (
                <Message
                  key={index}
                  type={msg.type}
                  timestamp={msg.timestamp}
                  text={msg.text}
                />
              ))}
              <div ref={messageEndRef} />
              <div
                style={{
                  textAlign: "center",
                  color: "#8AB3F0",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ marginRight: "8px" }}>New</span>
                <hr
                  style={{ flex: "1", margin: "0", borderColor: "#8AB3F0" }}
                />
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                borderRadius: "12px",
                height: "100px",
                paddingBottom: "12px",
                margin: "0 24px 12px 24px",
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
                  height: "100%",
                  padding: "8px",
                  gap: "35px",
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
                        marginRight: "14px",
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
                        marginRight: "14px",
                      }}
                    >
                      <Image
                        src="/assets/magic.svg"
                        width={15}
                        height={15}
                        alt="Magic Icon"
                      />
                    </Button>
                    <Button
                      style={{
                        border: "none",
                        cursor: "pointer",
                        color: "#000",
                        marginRight: "14px",
                      }}
                    >
                      <Image
                        src="/assets/Link.svg"
                        width={15}
                        height={15}
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
                        padding: "10px",
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
                        width={10}
                        height={5}
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
