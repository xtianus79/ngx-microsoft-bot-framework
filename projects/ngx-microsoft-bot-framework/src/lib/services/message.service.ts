import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    console.log("Bonjour !");
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
