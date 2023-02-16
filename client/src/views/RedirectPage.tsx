import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

interface Get {
  Error: any;
  user: {
    id: number;
    nick: string;
    provider: string;
  };
}

const RedirectPage = (): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const access_token = searchParams.get("access_token");

  const getInfo = async () => {
    try {
      await axios
        .get<Get>("/api/user/info", {
          headers: { Authorization: `Bearer ${access_token}` },
        })
        .then((res) => {
          const UserId = String(res.data.user.id);
          const UserNick = String(res.data.user.nick);
          const Provider = String(res.data.user.provider);
          window.localStorage.setItem("userId", UserId);
          window.localStorage.setItem("userNick", UserNick);
          window.localStorage.setItem("provider", Provider);
          window.localStorage.setItem("token", access_token!);
          // 로컬에서 변조한 토큰임

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
    getInfo();
  });

  return <div className="redirect"></div>;
};

export default RedirectPage;
