import { StatusCodes } from 'http-status-codes';

export default class extends Error {
  constructor (message, code = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(`Error: ${message}`);
    this.name = 'CustomError';
    this.code = code;
  }
}
