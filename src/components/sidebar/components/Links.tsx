import { Link, useLocation } from "react-router-dom";
import DashIcon from "components/icons/DashIcon";

export const SidebarLinks = (props: {
  routes: RoutesType[];
  collapsed: boolean;
}): JSX.Element => {
  let location = useLocation();
  const { routes, collapsed } = props;
  const activeRoute = (routeName: string) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      if (route.layout === "/admin" || route.layout === "/auth") {
        return (
          <Link key={index} to={route.layout + "/" + route.path}>
            <div className="relative mb-3 flex hover:cursor-pointer">
              <li
                className={`sidebar-link my-[3px] flex cursor-pointer items-center ${
                  collapsed ? "mx-auto" : "px-8"
                }`}
                key={index}
              >
                <span
                  className={`${
                    activeRoute(route.path) === true
                      ? "font-bold text-navy-700 dark:text-white"
                      : "font-medium text-gray-600"
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}
                </span>
                {!collapsed && (
                  <p
                    className={`leading-1 sidebar-link-text ml-4 flex ${
                      activeRoute(route.path) === true
                        ? "font-bold text-navy-700 dark:text-white"
                        : "font-medium text-gray-600"
                    }`}
                  >
                    {route.name}
                  </p>
                )}
              </li>
              {activeRoute(route.path) && (
                <div className="absolute right-0 top-px h-7 w-1 rounded-lg bg-red-600" />
              )}
            </div>
          </Link>
        );
      }
    });
  };
  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
