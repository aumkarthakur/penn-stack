import morgan from "morgan";

const dev = process.env.NODE_ENV !== "production";

const logger = () => {
  if (!dev) return (req, res, next) => next();
  
  return morgan("dev");
};

export default logger; 