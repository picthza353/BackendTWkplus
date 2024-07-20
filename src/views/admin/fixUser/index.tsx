import { useEffect, useState } from "react";
import getUsers from "../tables/vatiables/tableDataCheck";
import CheckTable from "./components/CheckTable";
import InputFixUser from "./components/InputFixUser";

const Marketplace = () => {
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
        {/* right side section */}
        <div className="col-span-1 mx-auto h-full w-96 rounded-xl 2xl:col-span-1">
          <InputFixUser />
          <div className="mb-5" />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
          <div>
            <CheckTable tableData={users} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
