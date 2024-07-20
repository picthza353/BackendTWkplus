import Card from "components/card";
import { useState } from "react";
import Swal from "sweetalert2";

const InputFindToken = () => {
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [passwordFocused, setPasswordFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleFocus = (setter: any) => () => setter(true);
  const handleBlur = (setter: any) => () => setter(false);
  const handleChange = (setter: any) => (e: any) => setter(e.target.value);

  const validateInputs = () => {
    let valid = true;

    if (!username) {
      setUsernameError("กรุณากรอกชื่อผู้ใช้งาน");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("กรุณากรอกรหัสผ่าน");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      let data = {
        username: (document.getElementById("username") as HTMLInputElement)
          .value,
        password: (document.getElementById("password") as HTMLInputElement)
          .value,
      };
      fetch(process.env.REACT_APP_API_URL + "signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status === "success") {
            Swal.fire({
              title: "Token",
              text: `${json.data.jwt}`,
              icon: "success",
              confirmButtonText: "ปิด",
            }).then(() => {
              window.location.href = "/admin/find-token";
            });
            return;
          } else if (json.data === "ไม่พบบัญชีที่เข้าสู่ระบบ") {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "ไม่พบบัญชีในระบบ",
              icon: "error",
              confirmButtonText: "ปิด",
            });
            return;
          } else if (json.data === "รหัสพลาดไม่ถูกต้อง") {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
              icon: "error",
              confirmButtonText: "ปิด",
            });
            return;
          }
        });
    }
  };

  return (
    <Card extra={"w-full sm:overflow-auto px-6"}>
      <div className="w-96 overflow-x-scroll xl:overflow-x-hidden">
        <div className="relative mt-5">
          <input
            type="text"
            id="username"
            value={username}
            onFocus={handleFocus(setUsernameFocused)}
            onBlur={handleBlur(setUsernameFocused)}
            onChange={handleChange(setUsername)}
            className={`flex h-12 w-full items-center justify-center rounded-xl border bg-white p-3 text-sm outline-none ${
              usernameError ? "border-red-500" : ""
            }`}
          />
          <label
            htmlFor="username"
            className={`absolute left-3 px-1 text-sm transition-all duration-200 ease-in-out ${
              usernameFocused || username
                ? "left-2 top-[-0.6rem] text-xs"
                : "left-3 top-[1rem] text-sm"
            }`}
          >
            ชื่อผู้ใช้งาน
          </label>
          {usernameError && (
            <p className="mt-1 text-xs text-red-500">{usernameError}</p>
          )}
        </div>
        <div className="relative mt-4">
          <input
            type="password"
            id="password"
            value={password}
            onFocus={handleFocus(setPasswordFocused)}
            onBlur={handleBlur(setPasswordFocused)}
            onChange={handleChange(setPassword)}
            className={`flex h-12 w-full items-center justify-center rounded-xl border bg-white p-3 text-sm outline-none ${
              passwordError ? "border-red-500" : ""
            }`}
          />
          <label
            htmlFor="password"
            className={`absolute left-3 px-1 text-sm transition-all duration-200 ease-in-out ${
              passwordFocused || password
                ? "left-2 top-[-0.6rem] text-xs"
                : "left-3 top-[1rem] text-sm"
            }`}
          >
            รหัสผ่าน
          </label>
          {passwordError && (
            <p className="mt-1 text-xs text-red-500">{passwordError}</p>
          )}
        </div>
        <button
          className="linear mb-5 mt-4 w-full rounded-xl bg-red-600 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-700 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
          onClick={handleSubmit}
        >
          หา Token
        </button>
      </div>
    </Card>
  );
};

export default InputFindToken;
