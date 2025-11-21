export default class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // Capture stack trace for cleaner debugging
    Error.captureStackTrace(this, this.constructor);
  }
}
