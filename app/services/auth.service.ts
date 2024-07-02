import { Observable, defer, map } from "rxjs";
import { UserSystem } from "../interfaces/user-system";
import { axiosClientJsonContent } from "../constant/constant";
import { axiosClientSecuredJsonContent } from "../constant/constant";

interface LoginResponse {
  user: UserSystem;
  token: string
}

export class AuthService {

  login(username: string, password: string): Observable<LoginResponse> {
    return defer(() => axiosClientJsonContent.post<LoginResponse>("/auth/login", {
      username,
      password
    })).pipe(
      map((response) => {
        return response.data;
      })
    )
  }

  authenticated(): Observable<LoginResponse> {
    const jwt = localStorage.getItem("jwt") ?? "";
    return defer(() => axiosClientSecuredJsonContent(jwt).get<LoginResponse>("/auth/authenticated")).pipe(
      map((response) => {
        return response.data
      })
    )
  }
}