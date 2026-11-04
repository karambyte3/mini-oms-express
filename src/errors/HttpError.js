export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

export class ConflictError extends HttpError {
  constructor(message = 'Conflict') {
    super(409, message);
  }
}
