import InputAddUser from "./components/InputAddUser";

const Marketplace = () => {
  return (
    <div className="mx-auto mt-3 flex h-full items-center justify-center">
      <div className="grid h-full grid-cols-1 ">
        {/* right side section */}
        <div className="col-span-1 h-full w-full sm:w-96 md:w-96 lg:w-96 xl:w-96 rounded-xl 2xl:col-span-1">
          <InputAddUser />
          <div className="mb-5" />
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
