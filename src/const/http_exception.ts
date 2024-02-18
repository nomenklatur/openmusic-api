import { RESPONSE_CODE } from '../const/api';

// Abstract Exception Class
export class HTTPException extends Error {
  public statusCode?: number;
  public name: string;

  constructor (message: string, statusCode: number = RESPONSE_CODE.INTERNAL_ERROR) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'HTTPException';
  }
}

export class ValidationException extends HTTPException {
  public name: string;

  constructor (message: string) {
    super(message, RESPONSE_CODE.UNPROCESSABLE_CONTENT);
    this.name = 'ValidationException';
  }
}

export class NotFoundException extends HTTPException {
  public name: string;

  constructor (message: string) {
    super(message, RESPONSE_CODE.NOT_FOUND);
    this.name = 'NotFoundException';
  }
}
