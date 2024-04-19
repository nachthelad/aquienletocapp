import Head from "next/head";
import { Inter } from "next/font/google";
import MainPage from "@/components/MainPage/page";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>¿A quién le toca?</title>
        <meta name="description" content="¿A quién le toca?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className}`}>
        <MainPage />
      </main>
    </>
  );
}
