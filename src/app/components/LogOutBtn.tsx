"use client";

import { useRouter } from "next/navigation";

interface LogOutBtnProps {
    className?: string;
    children?: React.ReactNode;
}

const LogOutBtn = ({className, children}: LogOutBtnProps) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
    window.location.reload();
  };
  return (
    <button 
    onClick={handleLogout}
    className={className ? className : "text-red-600"}
    >
        {children ? children : "Log out"}
    </button>
  );
};

export default LogOutBtn;
