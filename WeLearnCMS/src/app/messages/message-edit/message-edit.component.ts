import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('msgText') msgText: ElementRef; 
  @ViewChild('subject') subject: ElementRef; 
  currentSender = "Jordan"; 
  
  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    var message = new Message("2", this.subject.nativeElement.value, 
    this.msgText.nativeElement.value, this.currentSender);

    this.addMessageEvent.emit(message);
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }



}
