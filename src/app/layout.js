import "./globals.css";
export const metadata = {
  title: "Next.js",
  description: "Default Layout",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
