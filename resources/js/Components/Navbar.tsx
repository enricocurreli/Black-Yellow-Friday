import React, { useEffect, useState, useRef } from "react";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { ImMenu3 } from "react-icons/im";
import { CgMenuMotion } from "react-icons/cg";
import { IoIosArrowUp } from "react-icons/io";
import useScroll from "@/hooks/useScroll";
const Navbar = ({ auth }: PageProps) => {
  const [scrolled, scrollY] = useScroll();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Funzione per chiudere il dropdown quando clicco fuori
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div
        className={
          (scrollY > 30 ? "scrolledY " : " ") +
          "navbar bg-transparent fixed z-50 hidden md:flex"
        }
        ref={scrolled}
      >
        <div className="flex-1 px-5">
          <Link
            href="/"
            className={`
              ${scrollY > 30 ? "rotate180" : "rotate0"}
              transition-transform duration-500 text-5xl font-bold text-3d
            `}
            data-text="BWave"
          >
            B<span className="font-[Electrolize]">Wave</span>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-3 gap-3">
            {!auth?.user ? (
              <>
                <li>
                  <Link
                    href={route("login")}
                    className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white text-2xl font-bold hover:bg-[#FDED00] hover:text-black"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    href={route("register")}
                    className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white text-2xl font-bold hover:bg-[#FDED00] hover:text-black"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <Link
                  href={route("dashboard")}
                  className="rounded-md px-3 py-2  ring-1 ring-transparent transition focus:outline-none  text-white  text-2xl font-bold   btn-ghost hover:bg-[#FDED00] hover:text-black"
                >
                  Dashboard
                </Link>
                <Link
                  href={route("logout")}
                  method="post"
                  as="button"
                  className="rounded-md px-3 py-2  ring-1 ring-transparent transition hover:text-black focus:outline-none  text-white  text-2xl font-bold   btn-ghost hover:bg-red-600 font-[Electrolize]"
                >
                  Log Out
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* MOBILE NAVBAR */}
      <div
        className={
          (scrollY > 30 ? "scrolledY " : " ") +
          "navbar bg-transparent fixed z-50 md:hidden"
        }
        ref={scrolled}
      >
        <div className="navbar-start">
          <div className="relative">
            <div
              role="button"
              className="btn btn-ghost btn-circle "
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {!isOpen ? (
                <CgMenuMotion size={"45px"} />
              ) : (
                <IoIosArrowUp size={"45px"} />
              )}
            </div>
            {isOpen && (
              <div ref={dropdownRef}>
                <ul className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-5 w-[375px] p-4 shadow absolute grid grid-cols-3">
                  <li className=" ">
                    <a className="btn-ghost hover:bg-[#FDED00] px-3 py-2 hover:text-black text-lg font-bold">
                      Products
                    </a>
                  </li>
                  {!auth.user ? (
                    <>
                      <li>
                        <Link
                          href={route("login")}
                          className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white text-lg font-bold hover:bg-[#FDED00] hover:text-black"
                        >
                          Log in
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={route("register")}
                          className="rounded-md px-3 py-2 text-white ring-1 ring-transparent transition focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white text-lg font-bold hover:bg-[#FDED00] hover:text-black"
                        >
                          Register
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <Link
                        href={route("dashboard")}
                        className="rounded-md px-3 py-2  ring-1 ring-transparent transition hover:text-black/70 focus:outline-none  text-white  text-lg font-bold   btn-ghost hover:bg-[#FDED00] hover:text-black"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="rounded-md px-3 py-2  ring-1 ring-transparent transition hover:text-black/70 focus:outline-none  text-white  text-lg font-bold   btn-ghost hover:bg-[#FDED00] font-[Electrolize] hover:text-black"
                      >
                        Log Out
                      </Link>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="navbar-center">
          <Link
            href="/"
            className="text-5xl font-bold text-3d-mobile"
            data-text="BWave"
          >
            B<span className="font-[Electrolize]">Wave</span>
          </Link>
        </div>
        <div className="navbar-end">{/*  */}</div>
      </div>
    </>
  );
};

export default Navbar;
