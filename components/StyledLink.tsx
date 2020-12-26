import CSS from "csstype";
import Link from "next/link";

interface CustomLinkProps {
  link: string;
  text: string;
  extern?: boolean;
  style?: CSS.Properties;
  className?: string;
}

const CustomLink = (p: CustomLinkProps) => {
  return p.extern ? (
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      // XXX: Make sure to fix this after [this](https://github.com/react-spring/react-spring/issues/1102) is fixed
      style={p.style}
      className={p.className}
    >
      {p.text}
    </a>
  ) : (
    <Link href={p.link} passHref={true}>
      <a style={p.style} className={p.className}>
        {p.text}
      </a>
    </Link>
  );
};

export default CustomLink;
