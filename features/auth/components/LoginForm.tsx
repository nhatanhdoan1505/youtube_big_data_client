import { Box, Button } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect } from "react";
import { ILoginForm } from "../../../models/";
import InputField from "./InputField";
import {
  selectLoading,
  selectIsLoginSuccessfully,
  selectIsLoginFail,
  selectIsAdmin,
  authAction,
} from "../authSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

function signIn() {
  let isFirstLogin = true;
  const router = useRouter();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoading);
  const isLoginSuccessfully = useAppSelector(selectIsLoginSuccessfully);
  const isLoginFail = useAppSelector(selectIsLoginFail);
  const isAdmin = useAppSelector(selectIsAdmin);

  const initialValue: ILoginForm = {
    email: "",
    password: "",
  };

  const handlerLogin = (
    value: ILoginForm,
    { setErrors }: FormikHelpers<ILoginForm>
  ) => {
    isFirstLogin = false;
    setTimeout(() => {
      if (!value.email.includes("@"))
        return setErrors({ email: "Enter a valid email please" });

      if (value.password.length < 6)
        return setErrors({ password: "Password has at least 6 characters" });

      dispatch(authAction.login(value));
    }, 500);
  };

  useEffect(() => {
    if (!isFirstLogin && isLoginFail)
      toast({
        title: "Login Fail",
        description: "Email or Password is incorrect",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });

    if (isLoginSuccessfully) router.push("/home");
  }, [isLoading]);

  return (
    <>
      <Box maxW="400px" w="100%" mt={8} mx="auto">
        <Formik initialValues={initialValue} onSubmit={handlerLogin}>
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="email"
                placeholder="Enter a email"
                label="Email"
                type="text"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="Password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button
                type="submit"
                colorScheme="teal"
                mt={4}
                isLoading={isLoading}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default signIn;
