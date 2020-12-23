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
  display_name: string;
  rank: number;
  link: string;
  tags: Array<Tag>;
  description: string;
}

export const project_list: Array<Project> = [
  {
    display_name: "fluo-lang",
    rank: 0,
    link: "https://github.com/fluo-lang/fluoc",
    tags: [Tag.Rust],
    description: "a compiled programming language",
  },

  {
    display_name: "audioify",
    rank: 2,
    link: "https://github.com/MonliH/audioify",
    tags: [Tag.Typescript, Tag.React, Tag.Rust],
    description: "generate music from code",
  },

  {
    display_name: "iNNteractive",
    rank: 3,
    link: "https://github.com/MonliH/iNNteractive",
    tags: [Tag.Python, Tag.ML],
    description: "interactive neural networks behind a GUI",
  },

  {
    display_name: "emu-rs",
    rank: 4,
    link: "https://github.com/MonliH/emurs",
    tags: [Tag.Rust],
    description: "an emulator for the 8080 microprocessor",
  },

  {
    display_name: "pyarkovchain",
    rank: 5,
    link: "https://github.com/MonliH/pyarkovchain",
    tags: [Tag.Python],
    description: "a markov chain library",
  },

  {
    display_name: "four-ai",
    rank: 6,
    link: "https://github.com/MonliH/four-ai",
    tags: [Tag.Rust, Tag.ML],
    description: "connect four neural networks",
  },

  {
    display_name: "personal-website",
    rank: 7,
    link: "https://github.com/MonliH/personal-website",
    tags: [Tag.Typescript, Tag.React],
    description: "you're looking at it right now",
  },

  {
    display_name: "neutron-lang",
    rank: 8,
    link: "https://github.com/the-neutron-foundation/neutron-language",
    tags: [Tag.Python],
    description: "an interpreted programming language",
  },
];
