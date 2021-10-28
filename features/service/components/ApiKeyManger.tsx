import {
  DeleteIcon,
  SmallAddIcon,
  SmallCloseIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Center,
  Table,
  TableCaption,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
  ScaleFade,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  selectApiKey,
  selectLoading,
  serviceAction,
  selectUpdateLoading,
} from "../serviceSlice";

function ApiKeyManger() {
  const apiKey = useAppSelector(selectApiKey);
  const loading = useAppSelector(selectLoading);
  const updateLoading = useAppSelector(selectUpdateLoading);
  const [newKey, setNewKey] = useState("");

  const dispatch = useAppDispatch();
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    dispatch(serviceAction.getApiKey());
  }, []);

  const handlerTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewKey(event.target.value);
  };

  const updateApiKey = () => {
    if (newKey === "") return;
    const key = newKey.replace(/\n/g, ",") + "," + apiKey.join(",");
    dispatch(serviceAction.updateApiKey(key));
  };

  const deleteApiKey = (deletekey: string) => {
    const key = apiKey.filter((k) => k !== deletekey).join(",");
    dispatch(serviceAction.updateApiKey(key));
  };

  useEffect(() => {
    setNewKey("");
  }, [updateLoading]);
  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Api Key</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {apiKey.map((api, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{api}</Td>
              <Td>
                <DeleteIcon color="red.400" onClick={() => deleteApiKey(api)} />
                {loading ? <Button isLoading={loading}></Button> : null}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isOpen ? (
        <ScaleFade initialScale={3} in={isOpen}>
          <Textarea
            size="lg"
            placeholder="Enter apiKey channel"
            w="100%"
            value={!updateLoading ? newKey : ""}
            onChange={handlerTextAreaChange}
          />
        </ScaleFade>
      ) : null}
      <Center my={5}>
        <VStack w={{ base: "100%", sm: "90%", md: "80%", lg: "70%" }}>
          <HStack>
            <Button onClick={onToggle}>
              {isOpen ? <SmallCloseIcon /> : <SmallAddIcon />}
            </Button>
            {isOpen ? (
              <Button isLoading={updateLoading} onClick={updateApiKey}>
                <CheckIcon />
              </Button>
            ) : null}
          </HStack>
        </VStack>
      </Center>
    </>
  );
}

export default ApiKeyManger;
