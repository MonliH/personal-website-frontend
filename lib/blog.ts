export interface BlogEntryBase {
  readonly title: string;
  readonly url: string;
  readonly date: Date; // UTC time
}

export interface BlogEntryAdmin extends BlogEntryBase {
  readonly mdContents: string;
}

export interface BlogEntryPreview extends BlogEntryBase {
  readonly htmlPreview: string;
}

export interface BlogEntryDisplay extends BlogEntryBase {
  readonly htmlContents: string;
}

const intoBlogEntryBase = (json: Record<string, string>): BlogEntryBase => {
  return {
    title: json.title,
    url: json.url,
    date: new Date(json.date),
  };
};

export const intoBlogEntryAdmin = (
  json: Record<string, string>
): BlogEntryAdmin => {
  return { ...intoBlogEntryBase(json), mdContents: json.md_contents };
};

export const intoBlogEntryPreview = (
  json: Record<string, string>
): BlogEntryPreview => {
  return { ...intoBlogEntryBase(json), htmlPreview: json.html_preview };
};

export const intoBlogEntryDisplay = (
  json: Record<string, string>
): BlogEntryDisplay => {
  return { ...intoBlogEntryBase(json), htmlContents: json.html_contents };
};

export const intoBlogEntryBackend = ({
  mdContents,
  ...rest
}: BlogEntryAdmin): Record<string, string | Date> => {
  return { ...rest, md_contents: mdContents };
};

export const defaultBlog = (): BlogEntryAdmin => {
  return {
    title: "This is an awesome blog post!",
    url: "awesome-blog-title",
    date: new Date(),
    mdContents: "# Hello, world!\n\n**Start typing something awesome**",
  };
};
