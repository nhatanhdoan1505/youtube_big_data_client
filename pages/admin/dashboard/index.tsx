import {
  Button,
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
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { authAction, selectIsAdmin } from "../../../features/auth/authSlice";
import DashBoard from "../../../features/channel/pages/Dashboard";

const Home: NextPage = () => {
  const isAdmin = useAppSelector(selectIsAdmin);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authAction.checkIsAdmin());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!isAdmin) onOpen();
    }, 3000);
  }, [isAdmin]);

  const page = isAdmin ? (
    <DashBoard />
  ) : (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>You do not have admin Permission</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text as="code">Login for this page</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={() => router.push("/auth/signIn")}>
              Goto Login Page
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  return page;
};

export default Home;
