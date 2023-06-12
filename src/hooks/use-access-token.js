import { useEffect, useState } from "react";

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    const getAccessToken = async () => {
      const accessTokenRes = await fetch("/api/get-access-token");
      const parsedAccessToken = await accessTokenRes.json();
      setAccessToken(parsedAccessToken.accessToken);
    };
    getAccessToken();
  }, []);

  return accessToken;
};
