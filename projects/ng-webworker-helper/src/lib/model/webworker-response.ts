export class WebworkerResponse {
  type: string;
  result: any;
  id: string;
  exception: any;

  constructor(type: string, result: any, id: string, exception?: any) {
    this.type = type;
    this.result = result;
    this.id = id;
    this.exception = exception;
  }
}
