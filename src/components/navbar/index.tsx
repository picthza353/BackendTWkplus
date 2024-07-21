import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = (props: {
  brandText: string;
  secondary?: boolean | string;
  collapsed: boolean;
  toggleCollapse: () => void;
}) => {
  const { brandText, collapsed, toggleCollapse } = props;

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl transition-all duration-1000 ease-in-out dark:bg-[#0b14374d]">
      <div className="ml-[6px] flex items-center">
        <button
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-200 hover:rounded-lg hover:bg-gray-300"
          onClick={toggleCollapse}
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
        <p className="ml-3 shrink text-[20px] capitalize text-navy-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
