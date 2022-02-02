export enum Tag {
  // Languages
  Typescript = "Typescript",
  Rust = "Rust",
  Python = "Python",
  CS = "C#",
  GLSL = "GLSL",

  // Libraries/frameworks
  React = "React",
  ML = "Machine Learning",
}

export interface Project {
  displayName: string;
  rank: number;
  link: string;
  tags: Array<Tag>;
  description: string;
}

export const projectList: Array<Project> = [
  {
    displayName: "nimble-engine",
    rank: 0,
    link: "https://github.com/MonliH/nimble-engine",
    tags: [Tag.Python, Tag.GLSL],
    description: "a 3D game engine",
  },

  {
    displayName: "lulz",
    rank: 2,
    link: "https://github.com/MonliH/lulz",
    tags: [Tag.Rust],
    description: "a fast and spec-compliant LOLCODE implementation",
  },

  {
    displayName: "personal-website",
    rank: 3,
    link: "https://github.com/MonliH/personal-website",
    tags: [Tag.Typescript, Tag.React],
    description: "you're looking at it right now",
  },

  {
    displayName: "crabfish",
    rank: 4,
    link: "https://github.com/MonliH/crabfish",
    tags: [Tag.Rust],
    description: "a chess engine in rust",
  },

  {
    displayName: "issuebase",
    rank: 5,
    link: "https://github.com/MonliH/issuebase",
    tags: [Tag.Typescript, Tag.Rust, Tag.React],
    description: " list good first issues in popular github repositories ",
  },

  {
    displayName: "zircon",
    rank: 6,
    link: "https://github.com/MonliH/zircon",
    tags: [Tag.CS],
    description: "an interpreted and purely functional toy language",
  },

  {
    displayName: "four-ai",
    rank: 7,
    link: "https://github.com/MonliH/four-ai",
    tags: [Tag.Rust, Tag.ML],
    description: "connect four neural networks",
  },

  {
    displayName: "iNNteractive",
    rank: 8,
    link: "https://github.com/MonliH/iNNteractive",
    tags: [Tag.Python, Tag.ML],
    description: "interactive neural networks behind a GUI",
  },
];
