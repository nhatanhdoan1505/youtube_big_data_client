import { Box, Grid, GridItem } from "@chakra-ui/react";
import { FooterInformation, FooterContactForm } from "@component/container";
import React from "react";
import { Copyright } from "@component/ui";

export const Footer = () => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" px={4} py={4}>
      <GridItem colSpan={3}>
        <FooterInformation />
        <Copyright />
      </GridItem>
      <GridItem px={5}>
        <FooterContactForm />
      </GridItem>
    </Grid>
  );
};
