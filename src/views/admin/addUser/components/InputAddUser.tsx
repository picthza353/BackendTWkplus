import Card from "components/card";
import { useState } from "react";
import Swal from "sweetalert2";

const InputAddUser = () => {
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [passwordFocused, setPasswordFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [roleFocused, setRoleFocused] = useState(false);
  const [role, setRole] = useState("USER");

  const [timeoutFocused, setTimeoutFocused] = useState(false);
  const [timeout, setTimeout] = useState("");
  const [timeoutError, setTimeoutError] = useState("");

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

    if (!confirmPassword) {
      setConfirmPasswordError("กรุณายืนยันรหัสผ่าน");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("รหัสผ่านไม่ตรงกัน");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!timeout) {
      setTimeoutError("กรุณาเลือกวันใช้งาน");
      valid = false;
    } else {
      setTimeoutError("");
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
        timeout: (document.getElementById("timeout") as HTMLInputElement).value,
        role: (document.getElementById("role") as HTMLInputElement).value,
      };
      fetch(process.env.REACT_APP_API_URL + "signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          timeout: data.timeout,
          role: data.role,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status === "success") {
            Swal.fire({
              title: "เพิ่มผู้ใช้งานสำเร็จ",
              text: "",
              icon: "success",
              confirmButtonText: "ปิด",
            }).then(() => {
              window.location.href = "/admin/add-user";
            });
            return;
          } else if (json.data === "username already exists") {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "มีชื่อผู้ใช้งานในระบบแล้ว",
              icon: "error",
              confirmButtonText: "ปิด",
            });
            return;
          } else if (json.data === "username more than 4 characters") {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "ชื่อผู้ใช้งานต้องมีอย่างน้อย 4 ตัวอักษร",
              icon: "error",
              confirmButtonText: "ปิด",
            });
            return;
          } else if (json.data === "password more than 4 characters") {
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
        <div className="relative mt-4">
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onFocus={handleFocus(setConfirmPasswordFocused)}
            onBlur={handleBlur(setConfirmPasswordFocused)}
            onChange={handleChange(setConfirmPassword)}
            className={`flex h-12 w-full items-center justify-center rounded-xl border bg-white p-3 text-sm outline-none ${
              confirmPasswordError ? "border-red-500" : ""
            }`}
          />
          <label
            htmlFor="confirm-password"
            className={`absolute left-3 px-1 text-sm transition-all duration-200 ease-in-out ${
              confirmPasswordFocused || confirmPassword
                ? "left-2 top-[-0.6rem] text-xs"
                : "left-3 top-[1rem] text-sm"
            }`}
          >
            ยืนยันรหัสผ่าน
          </label>
          {confirmPasswordError && (
            <p className="mt-1 text-xs text-red-500">{confirmPasswordError}</p>
          )}
        </div>
        <div className="relative mt-4">
          <select
            id="timeout"
            value={timeout}
            onFocus={handleFocus(setTimeoutFocused)}
            onBlur={handleBlur(setTimeoutFocused)}
            onChange={handleChange(setTimeout)}
            className={`flex h-12 w-full items-center justify-center rounded-xl border bg-white p-3 text-sm outline-none ${
              timeoutError ? "border-red-500" : ""
            }`}
          >
            <option value="" disabled hidden></option>
            <option value="15">15 วัน</option>
            <option value="30">30 วัน</option>
            <option value="999999">ถาวร</option>
          </select>
          <label
            htmlFor="role"
            className={`absolute left-3 px-1 text-sm transition-all duration-200 ease-in-out ${
              timeoutFocused || timeout
                ? "left-2 top-[-0.6rem] text-xs"
                : "left-3 top-[1rem] text-sm"
            }`}
          >
            วันใช้งาน
          </label>
          {timeoutError && (
            <p className="mt-1 text-xs text-red-500">{timeoutError}</p>
          )}
        </div>
        <div className="relative mt-4">
          <select
            id="role"
            value={role}
            onFocus={handleFocus(setRoleFocused)}
            onBlur={handleBlur(setRoleFocused)}
            onChange={handleChange(setRole)}
            className="flex h-12 w-full items-center justify-center rounded-xl border bg-white p-3 text-sm outline-none"
          >
            <option value="USER" selected>
              USER
            </option>
          </select>
          <label
            htmlFor="role"
            className={`absolute left-3 px-1 text-sm transition-all duration-200 ease-in-out ${
              roleFocused || role
                ? "left-2 top-[-0.6rem] text-xs"
                : "left-3 top-[1rem] text-sm"
            }`}
          >
            ระดับ
          </label>
        </div>
        <button
          className="linear mb-5 mt-4 w-full rounded-xl bg-red-600 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-700 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
          onClick={handleSubmit}
        >
          เพิ่มสมาชิก
        </button>
      </div>
    </Card>
  );
};

export default InputAddUser;
