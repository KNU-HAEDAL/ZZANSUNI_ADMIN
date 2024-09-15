interface Props {
  errorCode: string;
  message: string;
  statusCode: number;
}

export class ApiError extends Error {
  errorCode: string;
  statusCode: number;
  constructor({errorCode, message, statusCode}: Props) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
  }
}