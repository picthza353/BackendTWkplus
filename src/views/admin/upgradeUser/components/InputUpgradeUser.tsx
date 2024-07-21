import Card from "components/card";
import { useState } from "react";
import Swal from "sweetalert2";

const InputUpgradeUser = () => {
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const [roleFocused, setRoleFocused] = useState(false);
  const [role, setRole] = useState("USER");

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
    return valid;
  };

  const handleSubmit = () => {
    if (validateInputs()) {
      let data = {
        username: (document.getElementById("username") as HTMLInputElement)
          .value,
        role: (document.getElementById("role") as HTMLInputElement).value,
      };
      fetch(process.env.REACT_APP_API_URL + "upgradeUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          role: data.role,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success) {
            Swal.fire({
              title: "อัพระดับสำเร็จ",
              text: "",
              icon: "success",
              confirmButtonText: "ปิด",
            }).then(() => {
              window.location.href = "/admin/upgrade-user";
            });
            return;
          } else if (json.error === "User not found") {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "ไม่พบผู้ใช้งานในระบบ",
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
            <option value="VIP">VIP</option>
            <option value="ADMIN">ADMIN</option>
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
          className="linear mb-5 mt-4 w-full rounded-xl bg-red-600 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-700 active:bg-red-700"
          onClick={handleSubmit}
        >
          อัพระดับ VIP
        </button>
      </div>
    </Card>
  );
};

export default InputUpgradeUser;
