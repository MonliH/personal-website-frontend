import { to_unix_timestamp } from "@lib/date";

export interface BlogEntry {
  readonly title: string;
  readonly url: string;
  readonly date: number; // UTC time
  readonly html_contents: string;
  readonly md_contents: string;
}

export const BLOG_COLOR_BG = "#FAFAFA";

export const into_blog_entry = (json: any): BlogEntry => {
  json.date = to_unix_timestamp(new Date(json.date));
  return json as BlogEntry;
};

export const default_blog = (): BlogEntry => {
  return {
    title: "",
    url: "",
    date: to_unix_timestamp(new Date("2020-01-01")),
    html_contents: "",
    md_contents: "",
  };
};
