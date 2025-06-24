import Image from "next/image";
import Link from "next/link";

import { History } from "./history";
import { SlashIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const Navbar = () => {
  // Dummy user for non-auth environment
  const session = null;

  return (
    <div className="bg-background absolute top-0 left-0 w-dvw py-2 px-3 justify-between flex flex-row items-center z-30">
      <div className="flex flex-row gap-3 items-center">
        <History user={session?.user} />
        <div className="flex flex-row gap-2 items-center">
          <Image
            src="/images/gemini-logo.png"
            height={20}
            width={20}
            alt="gemini logo"
          />
          <div className="text-zinc-500">
            <SlashIcon size={16} />
          </div>
          <div className="text-sm dark:text-zinc-300 truncate w-28 md:w-fit">
            Analytics Chatbot
          </div>
        </div>
      </div>

      <Button className="py-1.5 px-2 h-fit font-normal text-white" asChild>
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
};
