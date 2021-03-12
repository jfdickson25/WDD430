import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;
  constructor(private http: HttpClient) { 
    this.getMessages();
  }

  getMessages() {
    this.http.get<Message[]>('https://welearncms-default-rtdb.firebaseio.com/messages.json')
    .subscribe( (messages: Message[]) => {
      this.messages = messages;
      this.maxMessageId = this.getMaxId();
      this.messages.sort();
      this.messageChangedEvent.next(this.messages.slice());
    }, (error:any) => {
      console.log(error);
    })
  }

  storeMessages() {
    const messages = JSON.stringify(this.messages);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    this.http.put('https://welearncms-default-rtdb.firebaseio.com/messages.json', messages, {'headers': headers})
    .subscribe(() => {
      this.messageChangedEvent.next(this.messages.slice());
    });
  }

  getMessage(id: string): Message {
    return this.messages.find(message => message.id === id);
  }

  addMessage(message: Message): void {
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number {

    let maxId = 0;

    for(let message of this.messages) {
        let currentId = +message.id; 
        if (currentId > maxId) {
            maxId = currentId
        }
    }
    return maxId
  }
}
