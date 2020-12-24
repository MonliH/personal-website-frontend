import { GetStaticProps } from "next";

import Blog, { getStaticProps as oldGSP } from "@pages/blog/[page_no]";

export default Blog;

export const getStaticProps: GetStaticProps = async (context) => {
  return oldGSP({ ...context, params: { page_no: "1" } });
};
