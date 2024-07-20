// Admin Imports
import Dashboard from "views/admin/default";
import AddUser from "views/admin/addUser";
import AddTimeOut from "views/admin/addTimeout";
import FixUser from "views/admin/fixUser";
import ChangePassword from "views/admin/changePassword";
import UpgradeUser from "views/admin/upgradeUser";
import FindToken from "views/admin/findToken";

// Auth Imports
import SignIn from "views/auth/SignIn";
import LogOut from "views/auth/LogOut";

// Icon Imports
import {
  MdSupervisedUserCircle,
  MdToday,
  MdGeneratingTokens,
  MdPassword,
  MdUpgrade,
  MdLogout,
  MdSpaceDashboard,
} from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdSpaceDashboard className="h-6 w-6" />,
    component: <Dashboard />,
  },
  {
    name: "เพิ่มสมาชิก",
    layout: "/admin",
    path: "add-user",
    icon: <IoPersonAdd className="h-6 w-6" />,
    component: <AddUser />,
    secondary: true,
  },
  {
    name: "เพิ่มวันใช้งาน",
    layout: "/admin",
    path: "add-timeout",
    icon: <MdToday className="h-6 w-6" />,
    component: <AddTimeOut />,
    secondary: true,
  },
  {
    name: "แก้ยูสค้าง",
    layout: "/admin",
    path: "fix-user",
    icon: <MdSupervisedUserCircle className="h-6 w-6" />,
    component: <FixUser />,
    secondary: true,
  },
  {
    name: "เปลี่ยนรหัสผ่าน",
    layout: "/admin",
    path: "change-password",
    icon: <MdPassword className="h-6 w-6" />,
    component: <ChangePassword />,
    secondary: true,
  },
  {
    name: "อัพระดับ VIP",
    layout: "/admin",
    path: "upgrade-user",
    icon: <MdUpgrade className="h-6 w-6" />,
    component: <UpgradeUser />,
    secondary: true,
  },
  {
    name: "หา Token",
    layout: "/admin",
    path: "find-token",
    icon: <MdGeneratingTokens className="h-6 w-6" />,
    component: <FindToken />,
    secondary: true,
  },
  {
    name: "",
    layout: "/auth",
    path: "signin",
    component: <SignIn />,
    icon: null,
  },
  {
    name: "ออกจากระบบ",
    layout: "/auth",
    path: "logout",
    icon: <MdLogout className="h-6 w-6" />,
    component: <LogOut />,
  },
];
export default routes;
