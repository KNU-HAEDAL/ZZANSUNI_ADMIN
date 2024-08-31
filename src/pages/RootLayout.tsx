import RootHeader from "@/pages/RootHeader.tsx";
import {Outlet} from "react-router-dom";
export default function RootLayout() {

  return (
    <div className="w-dvw flex flex-col items-center bg-primary-bg-grey">
      <RootHeader/>
      <div className="w-dvw h-[calc(auto-80px)] pt-[80px]">
        <Outlet/>
      </div>
    </div>
  );
}