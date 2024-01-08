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
        source: "/acl-paper",
        destination: "https://aclanthology.org/2023.acl-short.120/",
        permanent: false,
        basePath: false,
      },
      {
        source: "/devpost",
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
    ];
  },
};

module.exports = nextConfig;
