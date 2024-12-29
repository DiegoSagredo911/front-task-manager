import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import GlobalContext from "./context/GlobalContext";

export const metadata = {
  title: "Task Manager",
  description: "Task Manager pruba tecnica de COALLY",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body>
        <GlobalContext>{children}</GlobalContext>
      </body>
    </html>
  );
}
