import chocchiqueImg from "../../public/website/chocchique_small.jpg";
import lawImg from "../../public/website/law_small.jpg";
import riftiumImg from "../../public/website/riftium_small.jpg";
import climateImg from "../../public/website/climate_small.jpg";

export const papers = [
  {
    title: "Prefix Propagation: Parameter-Efficient Tuning for Long Sequences",
    venue: "Association of Computational Linguistics 2023 (ACL 2023)",
    authors: ["Jonathan Li", "Will Aitken", "Rohan Bhambhoria", "Xiaodan Zhu"],
    link: "https://aclanthology.org/2023.acl-short.120/",
  },
  {
    title: "Command A: An Enterprise-Ready Large Language Model",
    venue: "arXiv preprint (2025)",
    authors: ["Cohere Team"],
    link: "https://arxiv.org/abs/2504.00698",
  },
  {
    title: "Parameter-Efficient Legal Domain Adaptation",
    venue:
      "Natural Legal Language Processing Workshop 2022 (NLLP @ EMNLP 2022)",
    authors: ["Jonathan Li", "Rohan Bhambhoria", "Xiaodan Zhu"],
    link: "https://aclanthology.org/2022.nllp-1.10/",
  },
  {
    title: "Evaluating AI for Law: Bridging the Gap with Open-Source Solutions",
    venue: "arXiv preprint (2024)",
    authors: ["Rohan Bhambhoria", "Samuel Dahan", "Jonathan Li", "Xiaodan Zhu"],
    link: "https://arxiv.org/abs/2404.12349",
  },
  {
    title: "Experimenting with Legal AI Solutions: The Case of Question-Answering for Access to Justice",
    venue: "Workshop on Generative AI and Law '24 (GenLaw @ ICML 2024)",
    authors: ["Jonathan Li", "Rohan Bhambhoria", "Samuel Dahan", "Xiaodan Zhu"],
    link: "https://blog.genlaw.org/pdfs/genlaw_icml2024/74.pdf"
  },
];

export const websites = [
  {
    displayLink: "climate-institutions.org",
    link: "https://www.climate-institutions.org/",
    description:
      "landing and conference page for the Institutions & Effective Climate Action project",
    image: climateImg,
  },
  {
    displayLink: "chocchique.ca",
    link: "https://www.chocchique.ca/",
    description:
      "marketing and e-commerce page for ChocChique, a local bean-to-bar chocolate startup",
    image: chocchiqueImg,
  },
  {
    displayLink: "riftium.ca",
    link: "https://www.riftium.ca/",
    description: "3d landing page and contact for Riftium, my local web firm",
    image: riftiumImg,
  },
  {
    displayLink: "immanuellaw.ca",
    link: "https://www.immanuellaw.ca/",
    description: "landing page and contact for Immanuel Law, a local law firm",
    image: lawImg,
  },
];

export const hackathonProjects = [
  {
    name: "🌙 moonlit",
    description: "emotional news detection",
    result: "3rd @ hack the change",
    link: "https://devpost.com/software/moonlit",
  },
  {
    name: "🚫 reBlock",
    description: "sponsor detection and skip",
    result: "1st @ hack3",
    link: "https://devpost.com/software/reblock-xjgkrb",
  },
  {
    name: "🚀 trajectify",
    description: "career trajectory prediction",
    result: "2nd @ jamhacks",
    link: "https://devpost.com/software/trajectify",
  },
  {
    name: "🎊 reSolve",
    description: "new years resolutions generation ",
    result: "1st @ see you later, hackulator",
    link: "https://devpost.com/software/resolution-pca8y2",
  },
  {
    name: "✈️ triptrove",
    description: "travel plans generation ",
    result: "1st @ wafflehacks",
    link: "https://devpost.com/software/triptrove",
  },
];

export const personalProjects = [
  {
    name: "🎮 nimble",
    description: "3d game engine with GUI, physics, and ECS system",
    link: "https://github.com/MonliH/nimble-engine",
  },
  {
    name: "️️🦀 crabfish",
    description: "chess engine that beats me pretty badly",
    link: "https://github.com/MonliH/crabfish",
  },
  {
    name: "🐱 lulz",
    description: "fast and spec-compliant LOLCODE implementation",
    link: "https://github.com/MonliH/lulz",
  },
  {
    name: "🐛 issuebase",
    description: "site to list good first issues in notable github repos",
    link: "https://github.com/MonliH/issuebase",
  },
  {
    name: "💎 zircon",
    description: "interpreted and purely functional toy language",
    link: "https://github.com/MonliH/zircon",
  },
];
