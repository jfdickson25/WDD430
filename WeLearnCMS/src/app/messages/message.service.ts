import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';

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
    this.http.get<Message[]>('http://localhost:3000/messages')
    .subscribe( (messages: Message[]) => {
      console.log("Messages: ", messages);
      this.messages = messages;
      this.maxMessageId = this.getMaxId();
      this.messages.sort();
      this.messageChangedEvent.next(this.messages.slice());
    }, (error:any) => {
      console.log(error);
    })
  }

  sortAndSend() {
    this.messages.sort();
    this.messageChangedEvent.next(this.messages.slice());
  }

  getMessage(id: string): Message {
    return this.messages.find(message => message.id === id);
  }

  addMessage(message: Message) {
    if (!message) {
      return;
    }

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new message to messages
          this.messages.push(responseData.message);
          this.sortAndSend();
        }
      );
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
