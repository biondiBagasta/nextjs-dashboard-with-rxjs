"use client"

import React, { useEffect, useState } from "react";
import SidebarComponent from "../components/sidebar-component";
import TopNavbarComponent from "../components/top-navbar-component";
import { userServiceStore } from "../store/service.store";
import { useRouter } from "next/navigation";
import { useAuthenticatedStore } from "../store/authenticated.store";
import { Subscription } from "rxjs";

export default function DashboardLayout({
  children
}: { children: React.ReactNode} ) {
  const [isOpenedSidebar, setIsOpenedSidebar ] = useState(true);

  const localStorageService = userServiceStore((state) => state.localStorageService);
  const authService = userServiceStore((state) => state.authService);

  const router = useRouter();

  const userState = useAuthenticatedStore((state) => state.userState);
  const setUserState = useAuthenticatedStore((state) => state.setUserState);

  const subscription = new Subscription();

  useEffect(() => {
    const jwt = localStorageService.getDataFromStorage("jwt");

    if(jwt) {
      const authenticatedSubscription = authService.authenticated().subscribe(data => {
        setUserState(data.user);
        localStorageService.saveDataToStorage("jwt", data.token);
      });

      subscription.add(authenticatedSubscription);
    } else {
      router.replace("/");
    }

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  return (
    <>
      <SidebarComponent isOpenedSidebar={ isOpenedSidebar }></SidebarComponent>
      <div className="home-section">
        <TopNavbarComponent isOpenedSidebar={ isOpenedSidebar }
        onClickSidebarIcon={
          () => {
            setIsOpenedSidebar(!isOpenedSidebar)
          }
        } user={ userState }></TopNavbarComponent>

        <div className="p-4">
          { children }
        </div>
      </div>
    </>
  )
}