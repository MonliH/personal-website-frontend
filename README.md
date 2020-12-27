# personal-website-frontend

This is the frontend part of my website. You can find the backend
[in the backend repo](https://github.com/monlih/personal-website-backend). The backend repo
also includes a nice diagram showing the architecture of the entire site. The
frontend has a dedicated server, which performs incremental static generation.
It rerenders the static page whenever a user loads the page where the backend
data (i.e.  blog entries) has changed. See [the Next.js documentation](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration)
for more info. This site is deployed on [vercel](https://vercel.com/), and uses
[Next.js](https://nextjs.org/) (with React).
