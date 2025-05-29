import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import AuthProvider from "@/components/auth-provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import ReduxProvider from "@/redux/redux-provider";

const openSansFont = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fleet - 2.0",
  description: "Video Conferencing App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.lineicons.com/4.0/lineicons.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link rel="shortcut icon" href="/img/favicon.svg" type="image/x-icon" />
      </head>
      <body className={`${openSansFont.className} antialiased`}>
        <AuthProvider>
          <ReduxProvider>
            {children}
            <ToastContainer />
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
