import { useEffect } from "react";

export default function LogOut(): any {
  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      fetch(process.env.REACT_APP_API_URL + "logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      }).then((res) => res.json());
    }

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/auth/signin";
  }, []);

  return null;
}
