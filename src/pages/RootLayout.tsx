import RootHeader from "@/pages/RootHeader.tsx";
import {Outlet} from "react-router-dom";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import LoadingSpinner from "@/components/LoadingSpinner.tsx";

export default function RootLayout() {

  return (
    <div className="w-dvw flex flex-col items-center bg-primary-bg-grey">
      <RootHeader/>
      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="w-dvw h-[calc(auto-80px)] pt-[80px]">
            <Outlet/>
          </div>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}