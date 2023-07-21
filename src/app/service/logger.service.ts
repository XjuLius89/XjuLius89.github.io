import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  info(log: string, context: { className: string }): void {
    console.log(log);
  }

  error(log: string, context: { className: string }): void {
    console.error(log);
  }
}
