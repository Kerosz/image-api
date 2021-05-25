// types
import type { NextFunction, Request, Response } from "express";

/**
 * Middleware used to validate the query string passed in for resizing images
 */
export function verifyResizeQuery(req: Request, _res: Response, next: NextFunction) {
  const resizeQueryParams = ["filename", "width", "height"];

  for (const value of resizeQueryParams) {
    if (!req.query[value]) {
      const error = new Error(`Your query string is missing '${value}' value!`);

      next(error);
    }
  }

  next();
}
