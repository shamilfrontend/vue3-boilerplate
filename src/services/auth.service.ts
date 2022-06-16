import api from "@/services";

import TokenService from "./token.service";

class AuthService {
  login({ username, password }: any) {
    return api
      .post("/auth/signin", {
        username,
        password
      })
      .then((response) => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }
        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  register({ username, email, password }: any) {
    return api.post("/auth/signup", {
      username,
      email,
      password
    });
  }
}

export default new AuthService();
