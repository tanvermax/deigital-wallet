import {
  LayoutDashboard,
  // BoltIcon,
  // BookOpenIcon,
  // Layers2Icon,
  LogOutIcon,
  UserPenIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link } from "react-router";

export interface IUser {
  email: string;
  name: string;
  role: 'ADMIN' | 'USER' | "AGENT";
}
interface UserMenuProps {
  userData: IUser
}


export default function UserMenu({ userData }: UserMenuProps) {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();


  const handlelogout = async () => {
    try {
      await logout(undefined);
    dispatch(authApi.util.resetApiState());
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src="/origin/avatar.jpg" alt="Profile image" />
            <AvatarFallback>{userData.name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">

            {userData?.name}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {userData?.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>Option 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>

          <DropdownMenuItem >

            <LayoutDashboard size={16} className="opacity-60" aria-hidden="true" />
            {
              userData.role === "AGENT" ? <Link to={"dashbord/agent"}><span>Dashbord</span></Link> : ""
            }
            {
              userData.role === "USER" ? <Link to={"dashbord/user"}><span>Dashbord</span></Link> : ""
            }
            {
              userData.role === "ADMIN" ? <Link to={"dashbord/admin"}><span>Dashbord</span></Link> : ""
            }
            {/* <Link to={"dashbord"}><span>Dashbord</span></Link> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>{userData.role}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handlelogout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
