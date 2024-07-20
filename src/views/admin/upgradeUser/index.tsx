import InputUpgradeUser from "./components/InputUpgradeUser";

const Marketplace = () => {
  return (
    <div className="mx-auto mt-3 flex h-full items-center justify-center">
      <div className="grid h-full grid-cols-1 ">
        {/* right side section */}
        <div className="col-span-1 h-full w-96 w-full rounded-xl 2xl:col-span-1">
          <InputUpgradeUser />
          <div className="mb-5" />
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
