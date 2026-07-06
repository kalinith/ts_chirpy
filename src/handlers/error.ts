import { Request, Response, NextFunction } from "express";


export class BadRequestError extends Error {//400
  constructor(message: string) {
    super(message);
  }
}

export class UnauthorizedError extends Error {//401
  constructor(message: string) {
    super(message);
  }
}

export class ForbiddenError extends Error {//403
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends Error {//404
  constructor(message: string) {
    super(message);
  }
}


export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof BadRequestError) {
    res.status(400).json({ error: err.message });
  } else if (err instanceof UnauthorizedError) {
    res.status(401).json({ error: err.message });
  } else if (err instanceof ForbiddenError) {
    res.status(403).json({ error: err.message });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
  } else {
    res.status(500).json({ error: "Something went wrong on our end" });
  }
}  
