import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Box, Heading } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Box>
      <Heading>Hello World</Heading>
    </Box>
  );
};

export default Home;
