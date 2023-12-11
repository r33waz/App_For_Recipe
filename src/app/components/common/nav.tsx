'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Logo from "../../../../public/images/RecipeLogo.jpeg";

function Header() {
  const pathname = usePathname();
  const Links = [
    { href: "/", label: "home" },
    { href: "/blog", label: "blog" },
    ,
    { href: "/randomRecipe", label: "randomRecipe" },
  ];
  return (
    <>
      <div className="flex justify-evenly p-4 items-center">
        <Image
          src={Logo}
          alt="Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <nav className="flex gap-5 uppercase">
          {Links.map((i, idx) => {
            return (
              <Link
                key={idx}
                href={i.href}
                className={`hover:text-green ${
                  pathname === i.href ? "text-white hover:text-white" : ""
                }`}
              >
                <span>{i?.label}</span>
              </Link>
            );
          })}
        </nav>
        <span></span>
      </div>
    </>
  );
}

export default Header;
