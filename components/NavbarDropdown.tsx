"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookmarkIcon, HeartIcon, LogOut, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Session, { session } from "next-auth";
import { useTransition } from "react";

export default function NavbarDropdown({ session }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const goTo = (path: string) => {
    router.push(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="font-medium max-sm:hidden">{session.user.name}</span>
          <div className="w-9 h-9 rounded-full overflow-hidden border shadow">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-sm text-white">
                {session.user.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 bg-white shadow-md border rounded-md py-1 z-50"
      >
        <DropdownMenuItem
          onClick={() => goTo(`/user/${session.user.id}`)}
          className="hover:bg-gray-200 cursor-pointer hover:text-primary transition-colors"
        >
          <UserIcon className="w-4 h-4 mr-2" /> Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => goTo(`/user/${session.user.id}/bookmarks`)}
          className="hover:bg-gray-200 cursor-pointer hover:text-primary transition-colors"
        >
          <BookmarkIcon className="w-4 h-4 mr-2" /> My Bookmarks
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => goTo(`/user/${session.user.id}/likes`)}
          className="hover:bg-gray-200 cursor-pointer hover:text-primary transition-colors"
        >
          <HeartIcon className="w-4 h-4 mr-2" /> My Likes
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="hover:bg-gray-200 cursor-pointer hover:text-primary transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2 text-red-500" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
