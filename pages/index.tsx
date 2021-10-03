import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin");
  }, []);
  return <></>;
};

export default Home;
