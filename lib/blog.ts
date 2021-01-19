export interface BlogEntry {
  readonly title: string;
  readonly url: string;
  readonly date: Date; // UTC time
  readonly htmlContents: string;
  readonly mdContents: string;
}

export const BLOG_COLOR_BG = "#FAFAFA";

export const intoBlogEntry = (json: any): BlogEntry => {
  return {
    title: json.title,
    url: json.url,
    date: new Date(json.date),
    htmlContents: json.html_contents,
    mdContents: json.md_contents,
  };
};

export const intoServerEntry = (entry: BlogEntry): Record<string, any> => ({
  title: entry.title,
  url: entry.url,
  date: entry.date,
  html_contents: entry.htmlContents,
  md_contents: entry.mdContents,
});

export const defaultBlog = (): BlogEntry => {
  return {
    title: "This is an awesome blog post!",
    url: "blog-title",
    date: new Date("2020-01-01"),
    mdContents: "# Hello, world!",
    htmlContents: "",
  };
};
