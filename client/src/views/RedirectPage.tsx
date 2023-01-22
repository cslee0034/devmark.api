import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";

interface Get {
  Error: any;
  id: number;
  nick: string;
}

const RedirectPage = (): JSX.Element => {
  const loginAPI = async () => {
    try {
      await axios.get<Get>("/api/info").then((res) => {
        const UserId = String(res.data.id);
        const UserNick = String(res.data.nick);
        window.sessionStorage.setItem("userId", UserId);
        window.sessionStorage.setItem("userNick", UserNick);

        window.location.replace("/");
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          (error.response as AxiosResponse<{ message: string }>)?.data.message
        );
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    loginAPI();
  });

  return <div className="redirect"></div>;
};

export default RedirectPage;
