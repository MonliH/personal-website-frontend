import { BlogPosts } from "@/app/components/posts";
import Header from "@/app/components/header";
import Link from "next/link";
import BlogWrapper from "./blogWrapper";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <BlogWrapper>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <p className="mb-8">
        Here are some ponderings on subjects I think are cool—ranging from
        physics to design to programming to biology. Please take everything I
        write with a grain of salt—I’m just a high school grad who hasn’t gone
        to university, yet. Also, please shoot me an
        <Link href="mailto:li.jonathan42@gmail.com"> email</Link>{" "}
        (li.jonathan42@gmail.com) if you have any suggestions, corrections, or
        discussion.
      </p>
      <BlogPosts />
    </BlogWrapper>
  );
}
