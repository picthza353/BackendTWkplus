import { useEffect, useState } from "react";
import getUsers from "../tables/vatiables/tableDataCheck";
import CheckTable from "./components/CheckTable";
import InputFixUser from "./components/InputFixUser";

const FixUser = () => {
  const [users, setUsers] = useState<any>([]);
  const [someUsers] = useState<any>([]);
  const loadUser = () => {
    getUsers().then((usersData) => {
      const user = usersData.filter((item: any) => item.login === true);
      setUsers(user);
    });
  };
  useEffect(() => {
    loadUser();
  }, [someUsers]);
  return (
    <div className="mx-auto mt-3 flex h-full items-center justify-center">
      <div className="grid h-full grid-cols-1">
        <div className="col-span-1 mx-auto h-full w-full rounded-xl sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:col-span-1">
          <InputFixUser />
        </div>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-1">
          <div>
            <CheckTable tableData={users} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixUser;
