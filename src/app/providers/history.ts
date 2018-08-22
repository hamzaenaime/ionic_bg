import { Injectable } from "@angular/core";

@Injectable()
export class HistoryProvider {
  public history: any;
  constructor() {
    this.history = [];
    this.history.push("/");
  }
}
