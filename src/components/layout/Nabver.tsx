import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Link } from "react-router"
import Logo from "../logos/navbar-components/logo"
import NotificationMenu from "../navbar-components/notification-menu"
import UserMenu from "../navbar-components/user-menu"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", active: true },
  { href: "feature", label: "Features" },
  { href: "pricing", label: "Pricing" },
  { href: "contact", label: "Contact" },
  { href: "faq", label: "FAQ" },
  { href: "about", label: "About" },
]

export default function Navber() {
  const { data } = useUserInfoQuery(undefined);
  console.log(data)
  return (
    <header className="border-b px-4 md:px-6 ">
      <div className="flex h-16 justify-between gap-4">
        {/* Left side */}
        <div className="flex gap-2">
          <div className="flex items-center md:hidden">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button className="group size-8" variant="ghost" size="icon">
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink asChild
                          href={link.href}
                          className="py-1.5"
                          active={link.active}
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>
          {/* Main nav */}
          <div className="flex items-center gap-6 text-teal-600 dark:text-teal-300">
            <a href="#" className=" hover:text-primary/90 ">
              <Logo />
            </a>
            {/* Navigation menu */}
            <NavigationMenu className="h-full *:h-full max-md:hidden">
              <NavigationMenuList className="h-full gap-2">
                {navigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index} className="h-full">
                    <NavigationMenuLink
                      active={link.active}
                      href={link.href}
                      className="h-full justify-center rounded-none border-y-2 border-transparent border-b-primary py-1.5 font-medium text-muted-foreground hover:border-b-primary hover:bg-transparent hover:text-primary data-[active]:border-b-primary data-[active]:bg-transparent!"
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">

          <div className="flex flex-1 items-center justify-end gap-2">
            {/* Notification */}
            {/* User menu */}
            {
              data?.data?.email && (<>
                <NotificationMenu />

                <UserMenu userData={data?.data} />
              </>)

            }
            {
              !data?.data?.email &&
              <>
                <Button asChild className="text-sm">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="ghost" size="sm" className="text-sm">
                  <Link to="sigin">Sign In</Link>
                </Button></>

            }
          </div>
        </div>
      </div>
    </header>
  )
}
