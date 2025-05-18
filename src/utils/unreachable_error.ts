export class UnreachableError extends Error {
  constructor(v: never) {
    super(v);
  }
}
