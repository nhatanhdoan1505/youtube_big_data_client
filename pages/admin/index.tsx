import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { authAction, selectIsAdmin } from "../../features/auth/authSlice";
import ClawForm from "../../features/service/components/ClawForm";
import { Header } from "../../component/common";

const Admin: NextPage = () => {
  // const isAdmin = useAppSelector(selectIsAdmin);
  // const router = useRouter();
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(authAction.checkIsAdmin());
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!isAdmin) onOpen();
  //   }, 1000);
  // }, [isAdmin]);

  // const page = isAdmin ? (
  //   <>
  //     <Header title="Admin Page" />
  //     <Center marginTop={4} pos="static">
  //       <Box width={{ base: "100%", sm: "100%", md: "90%", lg: "60%" }}>
  //         <ClawForm />
  //       </Box>
  //     </Center>
  //   </>
  // ) : (
  //   <>
  //     <Header title="Admin Page" />
  //     <Modal isOpen={isOpen} onClose={onClose}>
  //       <ModalOverlay />
  //       <ModalContent>
  //         <ModalHeader>You do not have admin Permission</ModalHeader>
  //         <ModalCloseButton />
  //         <ModalBody>
  //           <Text as="code">Login for this page</Text>
  //         </ModalBody>

  //         <ModalFooter>
  //           <Button colorScheme="blue" mr={3} onClick={onClose}>
  //             Close
  //           </Button>
  //           <Button variant="ghost" onClick={() => router.push("/auth/signIn")}>
  //             Goto Login Page
  //           </Button>
  //         </ModalFooter>
  //       </ModalContent>
  //     </Modal>
  //   </>
  // );

  const page = (
    <>
      <Header title="Admin Page" />
      <Center marginTop={4} pos="static">
        <Box width={{ base: "100%", sm: "100%", md: "90%", lg: "60%" }}>
          <ClawForm />
        </Box>
      </Center>
    </>
  );
  return page;
};

export default Admin;
