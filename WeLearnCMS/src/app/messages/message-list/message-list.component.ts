import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message("1", "Hello", "Hey you there", "Jordan Dickson"),
    new Message("2", "Hi", "Hi you there", "Jordan Dickson"),
    new Message("3", "Howdy", "Howdy you there", "Jordan Dickson")
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
