// For development
const API_DOMAIN =
  process.env.NODE_ENV && process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.jonathanli.tech";

export default API_DOMAIN;
