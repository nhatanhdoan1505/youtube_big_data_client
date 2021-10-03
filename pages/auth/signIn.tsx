import LoginForm from "../../features/auth/components/LoginForm";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { authAction } from "../../features/auth/authSlice";
import {
  selectIsLoginSuccessfully,
  selectIsLoginFail,
} from "../../features/auth/authSlice";
import { useRouter } from "next/router";

function signIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isLoginSuccessfully = useAppSelector(selectIsLoginSuccessfully);
  const isLoginFail = useAppSelector(selectIsLoginFail);

  useEffect(() => {
    dispatch(authAction.checkIsAdmin());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (isLoginSuccessfully) {
        router.push("/admin");
      }
    }, 1000);
  }, [isLoginSuccessfully]);

  return (
    <>
      <LoginForm />
    </>
  );
}

export default signIn;
