"use client";

import Link from "next/link";

export default function Header({ blog }: { blog?: boolean }) {
  return (
    <header
      className={`w-full ${
        blog ? "px-0 relative" : "top-0 px-8 absolute lg:fixed"
      } mt-8 z-10 text-white mix-blend-difference clip`}
    >
      <div className="flex flex-row gap-3.5">
        {!blog && <div className="w-full"></div>}

        {blog && (
          <>
            <Link href="/">Jonathan Li</Link>
            <p className="select-none">&#8226;</p>
          </>
        )}
        <Link href="/blog" className={blog ? "font-bold" : ""}>
          Blog
        </Link>
        <Link
          href="https://scholar.google.ca/citations?user=9AyfdMsAAAAJ&hl=en&authuser=1"
          target="_blank"
        >
          Scholar
        </Link>
        <Link href="https://www.linkedin.com/in/jonatli/" target="_blank">
          LinkedIn
        </Link>
      </div>
    </header>
  );
}
