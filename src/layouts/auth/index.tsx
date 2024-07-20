import { Routes, Route, Navigate } from "react-router-dom";
import routes from "routes";

export default function Auth() {
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";
  return (
    <div className="flex min-h-screen w-full items-center justify-center !bg-white dark:!bg-navy-900">
      <main className="flex min-h-screen w-full items-center justify-center">
        <div className="my-auto flex w-full items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center md:max-w-[75%] lg:h-screen lg:px-8 lg:pt-0 xl:max-w-[1383px] xl:px-0">
            <div className="w-full max-w-md px-5 md:px-12 lg:px-0">
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/auth/sign-in" replace />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
