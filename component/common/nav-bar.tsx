import { useAppDispatch, useAppSelector } from "@app/index";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FirebaseUser } from "@models/user";
import {
  selectFirebaseUser,
  selectIsUpdateUser,
  userAction,
  youtubeAction,
} from "@store/index";
import { setCookie } from "@utils/index";
import {
  getIdToken,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DesktopNav, MobileNav } from ".";
import { auth } from "../../firebaseClient/index";

export function WithSubNavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  const [isUserSignIn, setUserSignIn] = useState<boolean>(false);

  const firebaseUserSelector = useAppSelector(selectFirebaseUser);
  const isUpdateUserSelector = useAppSelector(selectIsUpdateUser);

  const [currentUid, setCurrentUid] = useState<string>(null!);

  const setToken = async (user: FirebaseUser) => {
    try {
      const token = await getIdToken(user, true);
      localStorage.setItem("token", token);
      setCookie("token", token);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(auth, (firebaseUser) => {
    console.log("Check");
    if (firebaseUser) {
      setUserSignIn(true);
      if (!firebaseUserSelector) {
        console.log("Has firebase user");
        dispatch(userAction.setIsUpdateUser({ isUpdateUser: false }));
        dispatch(
          userAction.setFirebaseUser({
            firebaseUser,
          })
        );
        setToken(firebaseUser);
      }

      return;
    }
    setUserSignIn(false);
  });

  useEffect(() => {
    if (firebaseUserSelector) {
      setCurrentUid(firebaseUserSelector.uid!);
    }
  }, [firebaseUserSelector]);

  useEffect(() => {
    if (firebaseUserSelector && currentUid && !isUpdateUserSelector) {
      const { uid, displayName, email, photoURL } = firebaseUserSelector;
      dispatch(
        userAction.updateUser({
          user: { uid, name: displayName!, email: email!, photoUrl: photoURL! },
        })
      );
      dispatch(userAction.setIsUpdateUser({ isUpdateUser: true }));
    }
  }, [firebaseUserSelector, currentUid]);

  const signInWithGoogle = async () => {
    let googleProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvider);
      setCurrentUid(null!);
      dispatch(userAction.setIsUpdateUser({ isUpdateUser: false }));
    } catch (error) {
      console.log(error);
    }
  };

  const onClickSignOut = async () => {
    try {
      await signOut(auth);

      dispatch(
        userAction.setFirebaseUser({
          firebaseUser: null!,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box w="100%">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <VStack
            alignItems="center"
            justifyContent="center"
            onClick={() => {
              dispatch(
                youtubeAction.setYoutubeObject({ youtubeObject: null! })
              );
              router.push("/");
            }}
            _hover={{ cursor: "pointer" }}
          >
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
              fontStyle="italic"
              fontWeight="semibold"
            >
              Youtube - ToolBox
            </Text>
          </VStack>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          {!firebaseUserSelector ? (
            <Button
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              onClick={signInWithGoogle}
            >
              Sign In
            </Button>
          ) : (
            <Menu>
              <MenuButton>
                <Image
                  src={firebaseUserSelector.photoURL!}
                  minWidth="30px"
                  borderRadius="50%"
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => router.push("/myPage/editProfile")}>
                  My Channel
                </MenuItem>
                <MenuItem onClick={onClickSignOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          )}
          {/* <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            href={"#"}
            _hover={{
              bg: "pink.300",
            }}
          >
            Sign Up
          </Button> */}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
