import { BlogPosts } from "@/app/components/posts";
import Header from "@/app/components/header";
import Link from "next/link";
import BlogWrapper from "@/app/blog/blogWrapper";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <BlogWrapper>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Thoughts & Musings</h1>
      <BlogPosts />
    </BlogWrapper>
  );
}
