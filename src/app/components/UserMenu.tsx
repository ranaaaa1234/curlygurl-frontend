"use client";

import { useState, useRef, useEffect } from "react";
import { UserCheck, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user: { id: number; name: string; email: string } | null;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  if (!user) return null;

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative inline-block"
      ref={menuRef}
      onMouseEnter={() => {
        if (!pinned) setIsOpen(true);
      }}
      onMouseLeave={() => {
        if (!pinned) setIsOpen(false);
      }}
    >
      <button
        onClick={() => {
          setPinned((prev) => !prev);
          setIsOpen(true);
        }}
        className="text-purple-400 hover:text-purple-900 transition"
      >
        <UserCheck className="w-9 h-9" />
      </button>

      {isOpen && (
        <div className="absolute right-0  w-40 bg-white border rounded-lg shadow-lg z-50">
          <ul>
            <li>
              <button
                onClick={() => router.push("/userprofile")}
                className="flex w-full justify-center items-center px-4 py-2 font-semibold hover:bg-purple-50 text-purple-900"
              >
                Profile
                <UserCheck className="inline w-5 h-5 ml-1" />
              </button>
            </li>
            <li>
              <button
                onClick={onLogout}
                className="flex w-full justify-center items-center px-4 py-2 font-semibold hover:bg-red-50 text-red-600"
              >
                Log out
                <LogOut className="inline w-5 h-5 ml-1" />
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
