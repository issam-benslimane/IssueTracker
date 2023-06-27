export abstract class AppError extends Error {
  isOperational: boolean;
  status: number;
  constructor(status: number, msg: string, isOperational = true) {
    super(msg);
    this.isOperational = isOperational;
    this.status = status;
  }
}

export class BadRequestError extends AppError {
  constructor(msg: string) {
    super(400, msg);
  }
}

export class UnauthorizedError extends AppError {
  constructor(msg: string) {
    super(401, msg);
  }
}

export class ForbiddenError extends AppError {
  constructor(msg: string) {
    super(403, msg);
  }
}
