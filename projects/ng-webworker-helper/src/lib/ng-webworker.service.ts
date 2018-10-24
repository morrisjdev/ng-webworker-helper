import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {WebworkerCommand} from './model/webworker-command';
import {WebworkerResponse} from './model/webworker-response';

@Injectable({
  providedIn: 'root'
})
export class NgWebworkerService {
  private readonly workerPath = 'assets/webworker/main.js'
  private worker: Worker;

  private commandSubjects: { [id: string]: Subject<any> } = {};

  constructor() {
    try {
      if (!!this.worker === false) {
        this.worker = new Worker(this.workerPath);

        this.worker.addEventListener('message', (event: MessageEvent) => {
          const response: WebworkerResponse = event.data;

          const subject = this.commandSubjects[response.id];

          if (subject) {

            if (response.type === 'complete') {
              if (!!response.exception) {
                subject.error(response.exception);
              } else {
                subject.next(response.result);
              }

              subject.complete();

              delete this.commandSubjects[response.id];
            } else {
              subject.next(response.result);
            }
          }
        });
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  public execute(name: string, data: any): Observable<any> {
    const command = new WebworkerCommand(name, data);

    const subject = new Subject<any>();
    this.commandSubjects[command.id] = subject;

    this.worker.postMessage(command);

    return subject;
  }

  public executeFunction(customFunction: ((parameter?: any) => any), parameter?: any): Observable<any> {
    const command = new WebworkerCommand('', null);
    command.customFunction = customFunction.toString();
    command.parameter = parameter;

    const subject = new Subject<any>();
    this.commandSubjects[command.id] = subject;

    this.worker.postMessage(command);

    return subject;
  }
}
