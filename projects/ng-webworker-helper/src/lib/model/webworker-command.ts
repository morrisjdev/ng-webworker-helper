import {Helper} from '../helper';

export class WebworkerCommand {
  name: string;
  data: any;
  id: string;
  customFunction?: string;
  parameter?: any;

  constructor(name: string, data: any) {
    this.name = name;
    this.data = data;
    this.id = Helper.guid();
  }
}
