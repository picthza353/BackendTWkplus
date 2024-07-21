import InputAddTimeOut from "./components/InputAddTimeOut";

const AddTimeOut = () => {
  return (
    <div className="mx-auto mt-3 flex h-full items-center justify-center">
      <div className="grid h-full grid-cols-1 ">
        <div className="col-span-1 h-full w-full rounded-xl sm:w-96 md:w-96 lg:w-96 xl:w-96 2xl:col-span-1">
          <InputAddTimeOut />
        </div>
      </div>
    </div>
  );
};

export default AddTimeOut;
