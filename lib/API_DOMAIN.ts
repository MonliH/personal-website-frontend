// For development
const API_DOMAIN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.jonat.li";

export default API_DOMAIN;
