import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useContext } from "react";

import CardCt from "@/components/Card/CardCt";
import TurnBtn from "@/components/Util/TurnBtn";
import { MainContext } from "@/context/main-context";
import MainLower from "@/components/MainLower";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { horizontal } = useContext(MainContext);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={horizontal ? "myMain myMain-horizontal" : "myMain"}>
        <TurnBtn />
        <div
          className={
            horizontal ? "myMain-upper myMain-upper-horizontal" : "myMain-upper"
          }
        >
          <CardCt upper={false} />
        </div>
        <div className="myMain-lower">
          <MainLower />
        </div>
      </main>
    </>
  );
}
