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
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-purple-400 hover:text-purple-900 transition"
      >
        <UserCheck className="w-9 h-9" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
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
