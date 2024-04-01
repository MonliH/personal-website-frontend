// @ts-check
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/shields",
        destination: "https://github.com/badges/shields/pull/5547",
        permanent: false,
        basePath: false,
      },
      {
        source: "/acl",
        destination: "https://aclanthology.org/2023.acl-short.120/",
        permanent: false,
        basePath: false,
      },
      {
        source: "/ht",
        destination: "https://devpost.com/jonatli",
        permanent: false,
        basePath: false,
      },
      {
        source: "/gh",
        destination: "https://github.com/MonliH",
        permanent: false,
        basePath: false,
      },
      {
        source: "/new",
        destination: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        permanent: false,
        basePath: false,
      },
      {
        source: "/chs",
        destination: "https://github.com/MonliH/crabfish",
        permanent: false,
        basePath: false,
      },
      {
        source: "/lulz",
        destination: "https://github.com/MonliH/lulz",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
