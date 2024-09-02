import {ClockLoader} from "react-spinners";
import {useEffect, useState} from "react";

export default function DelayedLoadingSpinner({size = 50, timeout = 200}) {
  const [showSpinner, setShowSpinner] = useState(false);

  /**
   * 200ms 후에 spinner를 보여준다.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, timeout);

    return () => clearTimeout(timer); // 메모리 누수 방지
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      {showSpinner && <ClockLoader color="#3ee660" size={size}/>}
    </div>
  );
}