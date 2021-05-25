import type { NextFunction, Request, Response } from "express";

/**
 * Middleware used to catch async errors and call global error handler
 * @param fn Controller async function
 */
const useAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next).catch(next));
  };

export default useAsync;
