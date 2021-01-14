import { GetStaticProps } from "next";

import Blog, { getStaticProps as oldGSP } from "@pages/blog/[pageNo]";

export default Blog;

export const getStaticProps: GetStaticProps = async (context) => {
  return oldGSP({ ...context, params: { pageNo: "1" } });
};
