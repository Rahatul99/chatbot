import * as Popover from "@radix-ui/react-popover";
import { Button } from "@radix-ui/themes";
import Image from "next/image";

const PopoverComponent = () => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <Button
            style={{
              background: "#F1F3F5",
              color: "#000",
              borderRadius: "14px",
              width: "135px",
              height: "28px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "8px",
              boxShadow: "0px 1px 4px 0px #00000024",
            }}
          >
            <Image
              src="/assets/downArrow.svg"
              width={12}
              height={15}
              alt="Down Arrow"
            />
            <span
              style={{
                fontSize: "10px",
                lineHeight: "12px",
                padding: "0 4px",
              }}
            >
              3 new messages
            </span>
            <Image
              src="/assets/cross.svg"
              width={7}
              height={7}
              alt="Down Arrow"
            />
          </Button>
        </div>
      </Popover.Trigger>
      <Popover.Content side="top" align="center">
        <div
          style={{
            padding: "8px",
            backgroundColor: "#f1f1f1",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          You have 3 new messages
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export default PopoverComponent;
