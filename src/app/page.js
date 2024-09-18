"use client";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import MyDialog from "@/components/Dialog";

const Home = () => {
  return (
    <Theme>
      <div
        style={{
          backgroundImage: 'url("/assets/cover.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
        }}
      >
        <MyDialog />
      </div>
    </Theme>
  );
};

export default Home;
