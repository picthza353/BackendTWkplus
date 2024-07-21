import Card from "components/card";
import { useState } from "react";
import Swal from "sweetalert2";

const InputChangePassword = () => {
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
      fetch(process.env.REACT_APP_API_URL + "rePassword", {
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
          if (json.success) {
            Swal.fire({
              title: "เปลี่ยนรหัสผ่านสำเร็จ",
              text: "",
              icon: "success",
              confirmButtonText: "ปิด",
            }).then(() => {
              window.location.href = "/admin/change-password";
            });
            return;
          } else if (json.error === "User not found") {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "ไม่พบบัญชีในระบบ",
              icon: "error",
              confirmButtonText: "ปิด",
            });
            return;
          } else if (json.error === "Password must be more than 3 characters") {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร",
              icon: "error",
              confirmButtonText: "ปิด",
            });
            return;
          }
        });
    }
  };

  return (
    <Card extra={"w-full px-6"}>
      <div className="w-full xl:overflow-x-hidden">
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
          เปลี่ยนรหัสผ่าน
        </button>
      </div>
    </Card>
  );
};

export default InputChangePassword;
