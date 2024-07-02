"use client"
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Input, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { userServiceStore } from "./store/service.store";
import { Subscription, tap, catchError, EMPTY } from "rxjs";
import { useRouter } from "next/navigation";
import { useAuthenticatedStore } from "./store/authenticated.store";

export default function LoginPage() {
  const [usernameControl, setUsernameControl] = useState("");
  const [passwordControl, setPasswordControl] = useState("");

  const [isLoadingSubmit, setLoadingSubmit] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const authService = userServiceStore((state) => state.authService);
  const localStorageService = userServiceStore((state) => state.localStorageService);
  const subscription = new Subscription();

  const authenticatedState = useAuthenticatedStore((state) => state.userState);
  const setAuthenticatedState = useAuthenticatedStore((state) => state.setUserState);

  const router = useRouter();

  useEffect(() => {

   const jwt = localStorageService.getDataFromStorage("jwt");

   if(jwt) {
    router.replace("/dashboard/main");
   }

   return () => {
    subscription.unsubscribe();
   }
  }, []);

  const login = () => {
    setLoadingSubmit(true);

    const loginSubscription = authService.login(usernameControl, passwordControl).pipe(
      tap(data => {
        setLoadingSubmit(false);
        localStorageService.saveDataToStorage("jwt", data.token);
        setAuthenticatedState(data.user);
        router.push("/dashboard/main");
      }),
      catchError((e) => {
        messageApi.open({
          type: "error",
          content: "INVALID USERNAME / PASSWORD."
        });
        setUsernameControl("");
        setPasswordControl("");
        setLoadingSubmit(false);

        return EMPTY;
      })
    ).subscribe();
  }


  return (
    <>
      { contextHolder }
      <div className="flex flex-row align-items-center justify-content-center"
      style={
        {
          height: '96vh'
        }
      }>
        <div className="w-6 h-auto m-auto">
          <Spin spinning={ isLoadingSubmit } tip="Loading..." size="large">
            <Card className="p-4">
              <div className="flex flex-row justify-content-center">
                <img src="/images/next-logo.png" className="mb-6 m-auto"
                style={
                  {
                    maxWidth: "128px",
                    height: "auto",
                  }
                } />
              </div>
              <Input size="large" placeholder="Username" value={ usernameControl } 
              prefix={ <UserOutlined />}
              className="mb-3"
              onChange={ (e) => setUsernameControl(e.target.value) }></Input>
              <Input placeholder="Password" value={ passwordControl } className="mb-3"
              size="large" prefix={ <LockOutlined /> } type="password"
              onChange={ (e) => setPasswordControl(e.target.value) } />
              <Button className="w-full" size="large" type="primary" onClick={
                () => {
                  login();
                }
              } disabled={ !usernameControl || !passwordControl }>Login</Button>
            </Card>
          </Spin>
        </div>
      </div>
    </>
  );
}
