import Link from "next/link";
import Image from "next/image";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";
import { ReactNode } from "react";

import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";

function Table({
  data,
}: {
  data: { headers: string[]; rows: string[][] };
}): JSX.Element {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: {
  href: string;
  children: React.ReactNode;
}): JSX.Element {
  let href = props.href;

  if (href.startsWith("/")) {
    return <Link {...props}>{props.children}</Link>;
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: React.ComponentProps<typeof Image>): JSX.Element {
  return <Image className="rounded-lg" {...props} />;
}

function Code({ children, ...props }: { children: string }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number): React.FC<{ children: string }> {
  const Heading = ({ children }: { children: string }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: ({ children }: { children: ReactNode }) => (
    <p className="mb-4">{children}</p>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 pl-4 my-4">{children}</blockquote>
  ),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote // @ts-ignore
      {...props}
      components={{ ...components, ...(props.components || {}) } as any}
      options={{
        mdxOptions: {
          rehypePlugins: [
            [
              rehypeKatex,
              {},
            ],
          ],
          remarkPlugins: [remarkMath, remarkGfm],
        },
      }}
    />
  );
}
