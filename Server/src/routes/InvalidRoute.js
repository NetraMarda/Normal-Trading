import { Router } from "express";
import logger from "../utils/logger.js";
const router = Router();

router.all("*", (req, res) => {
  const err = `Invalid routes ${req.url} with ${req.method} `;

  logger.error(err);
  res.status(404).json({ message: err });
});

export default router;
