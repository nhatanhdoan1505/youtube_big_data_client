import { Box } from "@chakra-ui/layout";
import { Header, NavBar } from "@component/common";
import HeroSection from "@component/home/HeroSection";
import { HomePageLayout } from "@layout/index";
import { NextPageWithLayout } from "@models/index";
import type { NextPage } from "next";

const Home: NextPageWithLayout = () => {
  return (
    <Box>
      <HeroSection
        channels="5450"
        views="100000"
        subscribes="1000"
        videos="100"
      />
    </Box>
  );
};

Home.Layout = HomePageLayout;

export default Home;
