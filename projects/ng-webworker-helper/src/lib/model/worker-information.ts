import {WebworkerHandlerBase} from './webworker-handler-base';

export interface WorkerInformation {
  [key: string]: (new (postMessageFunction: (data: any) => void, id: string) => WebworkerHandlerBase);
}
