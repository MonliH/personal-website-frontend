import createMDX from '@next/mdx'

const links = {
  "blender": "https://www.youtube.com/watch?v=2m0d_H97KII",
  "cobalt": "https://github.com/MonliH/CobaltLang",
  "reversi": "https://github.com/MonliH/Reversi-AI",
  "blender2": "https://www.youtube.com/watch?v=DV3PN-R0IM0",
  "coperr": "https://github.com/MonliH/coperr-lang",
  "neutron": "https://github.com/the-neutron-foundation/neutron-language",
  "discord": "https://github.com/MonliH/discord-repost-bot",
  "nn": "https://github.com/MonliH/iNNteractive",
  "oss1": "https://github.com/badges/shields/pull/5547",
  "oss2": "https://github.com/iced-rs/iced/pull/545",
  "oss3": "https://github.com/weirongxu/coc-explorer/pull/299",
  "alzheimers": "https://github.com/MonliH/adai",
  "web1": "https://monlih.github.io/personal-website-old/",
  "crabfish": "https://github.com/MonliH/crabfish",
  "nimble": "https://github.com/MonliH/nimble-engine",
  "new-years": "https://github.com/MonliH/reSolve",
  "chocolate": "https://www.chocchique.ca/",
  "nllp": "https://aclanthology.org/2022.nllp-1.10/",
  "reblock": "https://github.com/MonliH/reBlock",
  "acl": "https://aclanthology.org/2023.acl-short.120/",
  "genlaw": "https://blog.genlaw.org/pdfs/genlaw_icml2024/74.pdf",
  "lncs": "https://arxiv.org/pdf/2404.12349",
  "vr": "https://www.youtube.com/watch?v=L6QzVRYunt4",
  "trajectify": "https://github.com/MonliH/trajectify",
  "depression": "https://partner.projectboard.world/ysc/project/depressed-or-not-using-large-language-models-to-predict-depression-from-social-media-posts-meolde",
  "climate": "https://www.climate-institutions.org/",
  "ai-detector": "https://partner.projectboard.world/ysc/project/can-we-trust-ai-text-detectors-exposing-limitations-and-proposing-fixes",
  "scholar": "https://scholar.google.ca/citations?user=9AyfdMsAAAAJ"
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['next-mdx-remote'],
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    webpack(config) {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg'),
      )
  
      config.module.rules.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
          use: ['@svgr/webpack'],
        },
      )
  
      // Modify the file loader rule to ignore *.svg, since we have it handled now.
      fileLoaderRule.exclude = /\.svg$/i
  
      return config
    },
  
    // ...other config
    async redirects() {
      return Object.entries(links).map((items) => {
        return {
          source: `/${items[0]}`,
          destination: items[1],
          permanent: true,
        }
      });
    },
  }

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
  
// Merge MDX config with Next.js config
export default withMDX(nextConfig)
