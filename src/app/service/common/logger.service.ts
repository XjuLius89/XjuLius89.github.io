import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  info(log: string, context: { className: string }): void {
    console.log('[' + context.className + '] ' + log);
  }

  error(log: string, context: { className: string }): void {
    console.error('[' + context.className + '] ' + log);
  }

  warn(log: string, context: { className: string }): void {
    console.warn('[' + context.className + '] ' + log);
  }
}
