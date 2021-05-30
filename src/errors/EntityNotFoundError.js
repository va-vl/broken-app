import { StatusCodes } from 'http-status-codes';

export default class extends Error {
  constructor (entity) {
    super(`Error: ${entity} not found`);
    this.name = 'EntityNotFoundError';
    this.code = StatusCodes.NOT_FOUND;
  }
}
