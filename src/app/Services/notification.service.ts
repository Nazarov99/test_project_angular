import { Injectable } from '@angular/core';
import * as Noty from 'noty';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  success(text: string): void {
    new Noty({
      type: 'success',
      layout: 'topRight',
      theme: 'sunset',
      text: text,
      timeout: 5000,
      progressBar: true,
      closeWith: ['click', 'button'],
      killer: true,
    }).show();
  }

  error(text: string): void {
    new Noty({
      type: 'error',
      layout: 'topRight',
      theme: 'sunset',
      text: text,
      timeout: 5000,
      progressBar: true,
      closeWith: ['click', 'button'],
      killer: true,
    }).show();
  }

  warning(text: string): void {
    new Noty({
      type: 'warning',
      layout: 'topRight',
      theme: 'sunset',
      text: text,
      timeout: 5000,
      progressBar: true,
      closeWith: ['click', 'button'],
      killer: true,
    }).show();
  }

  info(text: string): void {
    new Noty({
      type: 'info',
      layout: 'topRight',
      theme: 'sunset',
      text: text,
      timeout: 5000,
      progressBar: true,
      closeWith: ['click', 'button'],
      killer: true,
    }).show();
  }
}
