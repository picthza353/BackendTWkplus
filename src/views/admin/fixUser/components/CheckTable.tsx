import { useState, useEffect } from "react";
import Card from "components/card";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Swal from "sweetalert2";

const columnHelper = createColumnHelper<User>();

type User = {
  username: string;
  login: boolean;
};

function CheckTable(props: { tableData: User[] }) {
  const { tableData } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(50);

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const handleButtonClick = async (username: string) => {
    try {
      fetch(process.env.REACT_APP_API_URL + "logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status === "success") {
            Swal.fire({
              title: "เรียบร้อย",
              text: "",
              icon: "success",
              confirmButtonText: "ปิด",
            }).then(() => {
              window.location.href = "/admin/fix-user";
            });
            return;
          } else if (json.data === "ไม่พบบัญชี") {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "ไม่พบบัญชีในระบบ",
              icon: "error",
              confirmButtonText: "ปิด",
            });
            return;
          } else {
            Swal.fire({
              title: "เกิดข้อผิดพลาด!",
              text: "ยังไม่ได้เข้าสู่ระบบ",
              icon: "error",
              confirmButtonText: "ปิด",
            });
            return;
          }
        });
    } catch (error) {
      console.error("Error sending username to API:", error);
    }
  };

  const columns = [
    columnHelper.accessor("username", {
      id: "username",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white sm:pr-0 lg:pr-[350px]">
          Username
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("login", {
      id: "login",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Action
        </p>
      ),
      cell: (info) => (
        <button
          className="w-24 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white transition duration-200 hover:bg-red-700 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
          onClick={() => handleButtonClick(info.row.original.username)}
        >
          แก้ยูสค้าง
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const pageCount = Math.ceil(data.length / pageSize);
  const currentPageData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handlePreviousFivePage = () => {
    setCurrentPage((prev) => Math.max(prev - 5, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1));
  };

  const handleNextFivePage = () => {
    setCurrentPage((prev) => Math.min(prev + 5, pageCount - 1));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (pageCount <= maxPagesToShow + 1) {
      for (let i = 0; i < pageCount; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`h-8 w-8 text-sm font-bold ${
              i === currentPage
                ? "rounded-lg bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-300 dark:text-white"
            }`}
          >
            {i + 1}
          </button>
        );
      }
    } else {
      if (currentPage < maxPagesToShow - 1) {
        for (let i = 0; i < maxPagesToShow; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`h-8 w-8 text-sm font-bold ${
                i === currentPage
                  ? "rounded-lg bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-300 dark:text-white"
              }`}
            >
              {i + 1}
            </button>
          );
        }

        pageNumbers.push(
          <button
            key="ellipsis1"
            onClick={handleNextFivePage}
            className="h-8 w-8 bg-gray-100 text-sm font-bold text-gray-600 hover:bg-gray-300 dark:text-white"
            onMouseEnter={(e: any) => (e.target.innerText = ">>")}
            onMouseLeave={(e: any) => (e.target.innerText = "...")}
          >
            ...
          </button>
        );

        pageNumbers.push(
          <button
            key={pageCount - 1}
            onClick={() => handlePageClick(pageCount - 1)}
            className={`h-8 w-8 text-sm font-bold ${
              currentPage === pageCount - 1
                ? "rounded-lg bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-300 dark:text-white"
            }`}
          >
            {pageCount}
          </button>
        );
      } else if (currentPage >= pageCount - maxPagesToShow + 1) {
        pageNumbers.push(
          <button
            key={0}
            onClick={() => handlePageClick(0)}
            className={`h-8 w-8 text-sm font-bold ${
              currentPage === 0
                ? "rounded-lg bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-300 dark:text-white"
            }`}
          >
            1
          </button>
        );

        pageNumbers.push(
          <button
            key="ellipsis2"
            onClick={handlePreviousFivePage}
            className="h-8 w-8 bg-gray-100 text-sm font-bold text-gray-600 hover:bg-gray-300 dark:text-white"
            onMouseEnter={(e: any) => (e.target.innerText = "<<")}
            onMouseLeave={(e: any) => (e.target.innerText = "...")}
          >
            ...
          </button>
        );

        for (let i = pageCount - maxPagesToShow; i < pageCount; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`h-8 w-8 text-sm font-bold ${
                i === currentPage
                  ? "rounded-lg bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-300 dark:text-white"
              }`}
            >
              {i + 1}
            </button>
          );
        }
      } else {
        pageNumbers.push(
          <button
            key={0}
            onClick={() => handlePageClick(0)}
            className={`h-8 w-8 text-sm font-bold ${
              currentPage === 0
                ? "rounded-lg bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-300 dark:text-white"
            }`}
          >
            1
          </button>
        );

        pageNumbers.push(
          <button
            key="ellipsis3"
            onClick={handlePreviousFivePage}
            className="h-8 w-8 bg-gray-100 text-sm font-bold text-gray-600 hover:bg-gray-300 dark:text-white"
            onMouseEnter={(e: any) => (e.target.innerText = "<<")}
            onMouseLeave={(e: any) => (e.target.innerText = "...")}
          >
            ...
          </button>
        );

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={`h-8 w-8 text-sm font-bold ${
                i === currentPage
                  ? "rounded-lg bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-300 dark:text-white"
              }`}
            >
              {i + 1}
            </button>
          );
        }

        pageNumbers.push(
          <button
            key="ellipsis4"
            onClick={handleNextFivePage}
            className="h-8 w-8 bg-gray-100 text-sm font-bold text-gray-600 hover:bg-gray-300 dark:text-white"
            onMouseEnter={(e: any) => (e.target.innerText = ">>")}
            onMouseLeave={(e: any) => (e.target.innerText = "...")}
          >
            ...
          </button>
        );

        pageNumbers.push(
          <button
            key={pageCount - 1}
            onClick={() => handlePageClick(pageCount - 1)}
            className={`h-8 w-8 text-sm font-bold ${
              currentPage === pageCount - 1
                ? "rounded-lg bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-300 dark:text-white"
            }`}
          >
            {pageCount}
          </button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <Card extra={"w-full px-6"}>
      <div className="xl:overflow-x-hidden">
        <table className="w-96">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start"
                  >
                    <div className="items-center justify-between text-xs text-gray-200">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: "",
                        desc: "",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {currentPageData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {table
                  .getRowModel()
                  .rows.slice(
                    currentPage * pageSize,
                    (currentPage + 1) * pageSize
                  )
                  [rowIndex].getVisibleCells()
                  .map((cell) => (
                    <td
                      key={cell.id}
                      className="min-w-[150px] border-white/0 py-3 pr-4"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="my-4 flex justify-center">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className={`h-8 w-8 rounded-l-full bg-gray-100 text-xl dark:text-white ${
              currentPage === 0
                ? "text-gray-600"
                : "text-navy-700 hover:bg-gray-300"
            }`}
          >
            {"<"}
          </button>
          <div className="flex bg-gray-100">{renderPageNumbers()}</div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === pageCount - 1}
            className={`h-8 w-8 rounded-r-full bg-gray-100 text-xl dark:text-white ${
              currentPage === pageCount - 1
                ? "text-gray-600"
                : "text-navy-700 hover:bg-gray-300"
            }`}
          >
            {">"}
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CheckTable;
