import {registerWebworker, WebworkerHandlerBase} from 'ng-webworker-helper';

class TestWorker extends WebworkerHandlerBase {
  run(data?: any): any {
    return data;
  }
}

class CPUWorker extends WebworkerHandlerBase {
  run(data: number): number {
    const before = new Date();
    let count = 0;

    this.send('das ist ein test');

    while (true) {
      count++;
      const now = new Date();
      if (now.valueOf() - before.valueOf() > data) {
        break;
      }
    }

    return count;
  }
}

registerWebworker({
  'test': TestWorker,
  'cpu': CPUWorker
});
