import { useAppSelector } from "@app/index";
import { ILayoutProps } from "@models/index";
import { selectUserProfile } from "@store/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function AdminLayout({ children }: ILayoutProps) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const userProfileSelector = useAppSelector(selectUserProfile);

  const router = useRouter();

  useEffect(() => {
    if (userProfileSelector && userProfileSelector.isAdmin) {
      setIsAdmin(true);
      return;
    }
    router.push("/login");
  }, []);
  return <>{isAdmin && children}</>;
}
