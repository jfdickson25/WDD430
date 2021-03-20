import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('msgText') msgText: ElementRef; 
  @ViewChild('subject') subject: ElementRef; 
  currentSender = "1"; 
  
  constructor(private messageService: MessageService, private contactService: ContactService) { }

  ngOnInit() {
  }

  onSendMessage() {
    let message = new Message("10", this.subject.nativeElement.value, 
    this.msgText.nativeElement.value, this.contactService.getContact("101"));

    this.messageService.addMessage(message);
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }



}
