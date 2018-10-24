import {WebworkerResponse} from './webworker-response';

export abstract class WebworkerHandlerBase {
  constructor(private postMessageFunction: (data: any) => void, private id: string) {
  }

  public send(data: any) {
    this.postMessageFunction(new WebworkerResponse('notify', data, this.id));
  }

  abstract run(data?: any): any;
}
