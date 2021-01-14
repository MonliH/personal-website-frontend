export interface BlogEntry {
  readonly title: string;
  readonly url: string;
  readonly date: Date; // UTC time
  readonly html_contents: string;
  readonly md_contents: string;
}

export const BLOG_COLOR_BG = "#FAFAFA";

export const intoBlogEntry = (json: any): BlogEntry => {
  json.date = new Date(json.date);
  return json as BlogEntry;
};

export const defaultBlog = (): BlogEntry => {
  return {
    title: "",
    url: "",
    date: new Date("2020-01-01"),
    html_contents: "",
    md_contents: "",
  };
};
