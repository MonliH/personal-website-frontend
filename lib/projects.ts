export enum Tag {
  // Languages
  Typescript = "Typescript",
  Rust = "Rust",
  Python = "Python",

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
    displayName: "fluo-lang",
    rank: 0,
    link: "https://github.com/fluo-lang/fluoc",
    tags: [Tag.Rust],
    description: "a compiled programming language",
  },

  {
    displayName: "audioify",
    rank: 2,
    link: "https://github.com/MonliH/audioify",
    tags: [Tag.Typescript, Tag.React, Tag.Rust],
    description: "generate music from code",
  },

  {
    displayName: "iNNteractive",
    rank: 3,
    link: "https://github.com/MonliH/iNNteractive",
    tags: [Tag.Python, Tag.ML],
    description: "interactive neural networks behind a GUI",
  },

  {
    displayName: "emu-rs",
    rank: 4,
    link: "https://github.com/MonliH/emurs",
    tags: [Tag.Rust],
    description: "an emulator for the 8080 microprocessor",
  },

  {
    displayName: "pyarkovchain",
    rank: 5,
    link: "https://github.com/MonliH/pyarkovchain",
    tags: [Tag.Python],
    description: "a markov chain library",
  },

  {
    displayName: "four-ai",
    rank: 6,
    link: "https://github.com/MonliH/four-ai",
    tags: [Tag.Rust, Tag.ML],
    description: "connect four neural networks",
  },

  {
    displayName: "personal-website",
    rank: 7,
    link: "https://github.com/MonliH/personal-website",
    tags: [Tag.Typescript, Tag.React],
    description: "you're looking at it right now",
  },

  {
    displayName: "neutron-lang",
    rank: 8,
    link: "https://github.com/the-neutron-foundation/neutron-language",
    tags: [Tag.Python],
    description: "an interpreted programming language",
  },
];
