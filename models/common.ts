import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { EmotionCache } from "@emotion/react";
import { io, Socket } from "socket.io-client";

export interface LayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout<T> = NextPage<T> & {
  Layout?: (props: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<any>;
};
export interface ILayoutProps {
  children: ReactNode;
}

export interface IResponse<T> {
  status: string;
  data: T;
}

export type SocketClient = ReturnType<typeof io>;
