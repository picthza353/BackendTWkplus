import Links from "./components/Links";
import routes from "routes";

const Sidebar = (props: { collapsed: boolean }) => {
  const { collapsed } = props;

  const filteredRoutes = routes.filter(
    (route) => route.path !== "signin" && route.path !== "logout"
  );

  const logOutRoute = routes.find((route) => route.path === "logout");

  return (
    <div
      className={`sidebar-container sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all md:!z-50 lg:!z-50 xl:!z-0 ${
        collapsed ? "collapsed" : ""
      }`}
    >
      <div className={`mx-auto mt-[50px] flex items-center justify-center`}>
        <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold ">
          {collapsed ? (
            <>
              <span className="text-red-600">T</span>
              <span className="text-black">W</span>
            </>
          ) : (
            <>
              <span className="text-red-600">THE</span>
              <span className="text-black">WISDOM</span>
            </>
          )}
        </div>
      </div>
      <div className="mb-7 mt-[58px] h-px bg-gray-300 dark:bg-white/30" />
      <ul className="flex flex-grow flex-col pt-1">
        <Links routes={filteredRoutes} collapsed={collapsed} />
      </ul>
      {logOutRoute && (
        <div className={`mt-auto flex pt-1 ${collapsed ? "mx-auto" : ""}`}>
          <Links routes={[logOutRoute]} collapsed={collapsed} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
