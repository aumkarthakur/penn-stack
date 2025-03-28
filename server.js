import express from "express";
import next from "next";
import cookieParser from "cookie-parser";

import apiRoutes from "./api/routes.js";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Parse JSON request bodies and cookies
  server.use(express.json());
  server.use(cookieParser());
  
  server.use("/api", apiRoutes);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Server listening at http://localhost:${port}`);
  });
});
