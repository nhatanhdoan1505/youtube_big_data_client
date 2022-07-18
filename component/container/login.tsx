import { useAppDispatch, useAppSelector } from "@app/index";
import {
  Box,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FirebaseUser } from "@models/user";
import {
  selectFirebaseUser,
  selectIsUpdateUser,
  userAction,
} from "@store/user";
import { setCookie } from "@utils/common";
import {
  FacebookAuthProvider,
  getIdToken,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillGoogleCircle, AiOutlineFacebook } from "react-icons/ai";
import { auth } from "../../firebaseClient/index";

export function Login() {
  const bgImage =
    "https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80";
  const image =
    "https://images.unsplash.com/photo-1594100513700-659fa01ce822?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHN0dWR5fGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=800&q=60";
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isUpdateUserSelector = useAppSelector(selectIsUpdateUser);

  const [currentUid, setCurrentUid] = useState<string>(null!);
  const firebaseUserSelector = useAppSelector(selectFirebaseUser);
  const [isUserSignIn, setIsUserSignIn] = useState<boolean>(false);


  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      setIsUserSignIn(true);
      return router.push("/");
    }
  });

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

  const signInWithFacebook = async () => {
    let facebookProvider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, facebookProvider);
      setCurrentUid(null!);
      dispatch(userAction.setIsUpdateUser({ isUpdateUser: false }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HStack
      w="100%"
      height="100vh"
      // backgroundImage={`url("${bgImage}")`}
      // backgroundPosition="center"
      // backgroundRepeat="no-repeat"
      justifyContent="center"
      alignItems="center"
    >
      <HStack
        w="100%"
        height="90%"
        maxWidth="1024px"
        boxShadow="rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"
      >
        <SimpleGrid columns={2} w="100%" height="100%">
          <Box bg="white" height="100%">
            <VStack
              w="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Text
                fontWeight="extrabold"
                fontSize="2rem"
                fontFamily="heading"
                letterSpacing="widest"
                mb={7}
              >
                LOGIN
              </Text>
              <VStack w="100%">
                <HStack
                  w="80%"
                  maxWidth="250px"
                  p={2}
                  backgroundColor="#DB4437"
                  borderRadius="8px"
                  onClick={signInWithGoogle}
                  _hover={{ cursor: "pointer" }}
                >
                  <HStack
                    justifyContent="center"
                    alignItems="center"
                    w="30px"
                    height="100%"
                  >
                    <Icon as={AiFillGoogleCircle} color="white" />
                  </HStack>
                  <HStack
                    backgroundColor="#DB4437"
                    opacity="80%"
                    w="100%"
                    justifyContent="center"
                  >
                    <Text color="white">Login with Google</Text>
                  </HStack>
                </HStack>
                <HStack
                  w="80%"
                  maxWidth="250px"
                  p={2}
                  backgroundColor="#4267B2"
                  borderRadius="8px"
                  onClick={signInWithFacebook}
                  _hover={{ cursor: "pointer" }}
                >
                  <HStack
                    justifyContent="center"
                    alignItems="center"
                    w="30px"
                    height="100%"
                  >
                    <Icon as={AiOutlineFacebook} color="white" />
                  </HStack>
                  <HStack
                    backgroundColor="#4267B2"
                    opacity="80%"
                    w="100%"
                    justifyContent="center"
                  >
                    <Text color="white">Login with Facebook</Text>
                  </HStack>
                </HStack>
              </VStack>
              <Link href={"/"}>Back To Home</Link>
            </VStack>
          </Box>
          <Box
            height="100%"
            backgroundImage={`url("${image}")`}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
          ></Box>
        </SimpleGrid>
      </HStack>
    </HStack>
  );
}
