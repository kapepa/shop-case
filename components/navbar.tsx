import { FC } from "react";
import { MaxWidthWrapper } from "./max-width-wrapper";
import Link from "next/link";
import { RoutesPaths } from "@/types/enums";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar: FC = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav
      className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all"
    >
      <MaxWidthWrapper>
        <div
          className="flex h-14 items-center justify-between border-b border-zinc-200"
        >
          <Link
            href={RoutesPaths.Home}
            className="flex z-40 font-semibold"
          >
            Case <span className="text-green-600">cobra</span>
          </Link>

          <div
            className="h-full flex items-center space-x-4"
          >
            {
              !!user 
              ? (
                <>
                  <Link
                    href={RoutesPaths.ApiLogout}
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Sign out
                  </Link>
                  {
                    isAdmin && (
                      <Link
                        href={RoutesPaths.Dashboard}
                        className={buttonVariants({
                          size: "sm",
                          variant: "ghost",
                        })}
                      >
                        Dashboard
                      </Link>
                    )
                  }
                  <Link
                    href={RoutesPaths.ConfigureUpload}
                    className={buttonVariants({
                      size: "sm",
                      className: "hidden sm:flex items-center gap-1"
                    })}
                  >
                    Create case
                    <ArrowRight
                      className="ml-1.5 h-5 w-5"
                    />
                  </Link>
                </>
              ) 
              : (
                <>
                  <Link
                    href={RoutesPaths.ApiRegister}
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Sign up
                  </Link>
                  <Link
                    href={RoutesPaths.ApiLoin}
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Login
                  </Link>
                  <div
                    className="h-8 w-px bg-zinc-200 hidden sm:block"
                  />
                  <Link
                    href={RoutesPaths.ConfigureUpload}
                    className={buttonVariants({
                      size: "sm",
                      className: "hidden sm:flex items-center gap-1"
                    })}
                  >
                    Create case
                    <ArrowRight
                      className="ml-1.5 h-5 w-5"
                    />
                  </Link>
                </>
              )
            }
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export { Navbar };