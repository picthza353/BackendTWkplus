import InputField from "components/fields/InputField";
import Swal from "sweetalert2";

export default function SignIn() {
  const signin = () => {
    let data = {
      username: (document.getElementById("username") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value,
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
          let middle = json.data.jwt.split(".")[1];
          let data = JSON.parse(atob(middle));
          if (data["roles"][0] === "ADMIN") {
            Swal.fire({
              title: "เข้าสู่ระบบสำเร็จ",
              text: "",
              icon: "success",
              confirmButtonText: "ปิด",
            }).then(() => {
              localStorage.setItem("token", json.data.jwt);
              localStorage.setItem("username", data.username);
              window.location.href = "/admin/default";
            });
            return;
          }
          Swal.fire({
            title: "เกิดข้อผิดพลาด!",
            text: "ไม่มี permission เข้า",
            icon: "error",
            confirmButtonText: "ปิด",
          });
          return;
        } else {
          Swal.fire({
            title: "เกิดข้อผิดพลาด!",
            text: "โปรดใส่ข้อมูลชื่อผู้ใช้งาน และรหัสผ่าน",
            icon: "error",
            confirmButtonText: "ปิด",
            confirmButtonColor: "#FF0000",
          });
          return;
        }
      });
  };
  return (
    <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-center text-2xl font-bold text-navy-700 dark:text-white">
          ระบบจัดการหลังบ้าน
        </h4>
        <div className="mb-6 flex items-center">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        {/* Username */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="ชื่อผู้ใช้"
          placeholder="ใส่ชื่อผู้ใช้"
          id="username"
          type="text"
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="รหัสผ่าน"
          placeholder="ใส่รหัสผ่าน"
          id="password"
          type="password"
        />
        <button
          className="linear mt-2 w-full rounded-xl bg-red-600 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-700 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
          onClick={signin}
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
}
