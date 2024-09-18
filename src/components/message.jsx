import { formatDate } from "./formatDate";

const { default: Image } = require("next/image");

const Message = ({ type, timestamp, text }) => {
  const isReceived = type === "received";
  return (
    <div
      style={{ marginBottom: "8px", textAlign: isReceived ? "left" : "right" }}
    >
      <div
        style={{
          fontSize: "8px",
          color: "#9396A4",
          marginBottom: "3px",
          fontWeight: "500px",
          marginLeft: isReceived ? "41px" : "",
        }}
      >
        {formatDate(timestamp)}
      </div>
      {isReceived ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/assets/avatar.svg"
            width={25}
            height={25}
            alt="Avatar"
            style={{ borderRadius: "50%", marginRight: "8px" }}
          />
          <div
            style={{
              padding: "10px",
              borderRadius: "16px",
              backgroundColor: "#EFF1F4",
              fontSize: "11px",
              fontWeight: "500px",
            }}
          >
            {text}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "inline-block",
            padding: "10px",
            borderRadius: "16px 0 0 16px",
            backgroundColor: "#D7FFE9",
            fontSize: "11px",
            fontWeight: "500px",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Message;
