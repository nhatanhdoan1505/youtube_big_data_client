import { LayoutProps } from "@models/index";
import React, { ReactElement } from "react";

interface Props {}

export function EmptyLayout({ children }: LayoutProps): ReactElement {
  return <>{children}</>;
}
