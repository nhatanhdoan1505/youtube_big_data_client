import React, { useEffect } from "react";
import { Header } from "../../../component/common/Header";
import ApiKeyManagerLayout from "../../../features/service/components/ApiKeyManger";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { authAction, selectIsAdmin } from "../../../features/auth/authSlice";
import { useRouter } from "next/router";
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

function ApiKeyManager() {
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
    }, 1000);
  }, [isAdmin]);

  const page = isAdmin ? (
    <>
      <Header title="Api Key Manager" />
      <ApiKeyManagerLayout />
    </>
  ) : (
    <>
      <Header title="Admin Page" />
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
}

export default ApiKeyManager;
