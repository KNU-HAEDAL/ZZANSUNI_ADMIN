import {ClockLoader} from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <ClockLoader color="#3ee660" />
    </div>
  );

}