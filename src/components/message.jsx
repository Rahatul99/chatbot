import Image from "next/image";
import { formatDate } from "./formatDate";

const Message = ({ type, timestamp, text, isLastSentMessage }) => {
  const isReceived = type === "received";

  const timeInfo = (
    <>
      <div
        style={{
          fontSize: "7px",
          color: "#9396A4",
          marginBottom: "4px",
          fontWeight: "500px",
          lineHeight: "8.5px",
          margin: isReceived ? "0 0 0 48px" : "0 24px 0 0",
        }}
      >
        {isReceived ? <span>kitto .</span> : ""} {formatDate(timestamp)}
      </div>
    </>
  );

  return (
    <div
      style={{
        marginBottom: "4px",
        textAlign: isReceived ? "left" : "right",
      }}
    >
      {isReceived ? (
        <>
          {timeInfo}
          <div style={{ display: "flex", margin: "0 0 17px 24px" }}>
            <Image
              src="/assets/avatar.svg"
              width={20}
              height={20}
              alt="Avatar"
              style={{ borderRadius: "50%", marginRight: "4px" }}
            />
            <div
              style={{
                padding: "10px",
                borderRadius: "0 16px 16px 0",
                backgroundColor: "#EFF1F4",
                fontSize: "10px",
                fontWeight: "500px",
                lineHeight: "12px",
              }}
            >
              {text}
            </div>
          </div>
        </>
      ) : (
        <>
          {isLastSentMessage && (
            <div
              style={{
                textAlign: "center",
                color: "#8AB3F0",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "34px 24px 17px",
              }}
            >
              <span
                style={{
                  marginRight: "6px",
                  lineHeight: "7px",
                  fontWeight: "500px",
                }}
              >
                New
              </span>
              <hr
                style={{
                  flex: "1",
                  margin: "0",
                  borderColor: "#8AB3F0",
                  height: "1px",
                }}
              />
            </div>
          )}
          {timeInfo}
          <div
            style={{
              display: "inline-block",
              padding: "10px",
              borderRadius: "16px 0 0 16px",
              backgroundColor: "#D7FFE9",
              fontSize: "10px",
              fontWeight: "500px",
              marginRight: "24px",
              lineHeight: "12px",
            }}
          >
            {text}
          </div>
        </>
      )}
    </div>
  );
};

export default Message;
