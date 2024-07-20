import { IoPerson } from "react-icons/io5";
import { MdPeople } from "react-icons/md";

import Widget from "components/widget/Widget";
import CheckTable from "views/admin/default/components/CheckTable";
import { useState, useEffect } from "react";
import getUsers from "../tables/vatiables/tableDataCheck";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [countUser, setCountUser] = useState(0);
  const [countLogin, setCountLogin] = useState("");

  const [users, setUsers] = useState<any>([]);
  const [someUsers] = useState<any>([]);
  const loadUser = () => {
    getUsers().then((usersData) => {
      setUsers(usersData);
    });
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("token") === undefined ||
      localStorage.getItem("token") === "undefined"
    ) {
      window.location.href = "/auth/signin";
      return;
    }
    fetch(process.env.REACT_APP_API_URL + "dashboard")
      .then((response) => response.json())
      .then((json) => {
        setCountUser(json.user_count);
        setCountLogin(json.online_user_count);
      });
    loadUser();
  }, [someUsers]);

  const search = () => {
    let data = {
      username: (document.getElementById("username") as HTMLInputElement).value,
    };
    fetch(process.env.REACT_APP_API_URL + `user/${data.username}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.success === true) {
          setUsers(json.data);
          return;
        } else {
          Swal.fire({
            title: "เกิดข้อผิดพลาด!",
            text: "ไม่พบชื่อผู้ใช้งาน",
            icon: "error",
            confirmButtonText: "ปิด",
            confirmButtonColor: "#FF0000",
          });
          return;
        }
      });
  };
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 3xl:grid-cols-6">
        <Widget
          icon={<MdPeople className="h-7 w-7 text-navy-700" />}
          title={"ผู้ใช้ทั้งหมด"}
          subtitle={`${countUser}`}
        />
        <Widget
          icon={<IoPerson className="h-6 w-6 text-navy-700" />}
          title={"ผู้ใช้งานทั้งหมด"}
          subtitle={`${countLogin}`}
        />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-6">
        <div className="relative">
          <input
            type="text"
            id="username"
            placeholder="ใส่ชื่อผู้ใช้งาน"
            className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white p-3 text-sm outline-none"
          />
          <label
            htmlFor="username"
            className="bg-tranparent text-black absolute left-0 top-0 px-3 text-sm"
          >
            ชื่อผู้ใช้งาน
          </label>
        </div>
        <button
          className="linear mt-2 w-full rounded-xl bg-red-600 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-700 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
          onClick={search}
        >
          ค้นหา
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <div>
          <CheckTable tableData={users} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
