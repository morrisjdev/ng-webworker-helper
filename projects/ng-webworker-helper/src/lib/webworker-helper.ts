import {WorkerInformation} from './model/worker-information';
import {WebworkerCommand} from './model/webworker-command';
import {WebworkerResponse} from './model/webworker-response';

// Workaround: Context gets lost when using functions
const postMessageFunction: (data: any) => void = self.postMessage.bind(self) as any;

export function registerWebworker(registeredWebworker: WorkerInformation) {

  addEventListener('message', (event: MessageEvent) => {

    const command: WebworkerCommand = event.data;

    if (!!command.customFunction) {

      try {
        const fn = new Function('return ' + command.customFunction)();
        const result = fn(command.parameter);
        postMessageFunction(new WebworkerResponse('complete', result, command.id));
      } catch (ex) {
        postMessageFunction(new WebworkerResponse('complete', null, command.id, ex));
      }
    } else {
      const webworkerHandlerClass = registeredWebworker[command.name];

      if (!!webworkerHandlerClass) {
        try {
          const webworkerHandler = new webworkerHandlerClass(postMessageFunction, command.id);
          const result = webworkerHandler.run(command.data);

          postMessageFunction(new WebworkerResponse('complete', result, command.id));
        } catch (ex) {
          postMessageFunction(new WebworkerResponse('complete', null, command.id, ex));
        }
      }
    }
  });

}
