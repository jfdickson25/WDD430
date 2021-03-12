import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Contact
} from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.contacts;
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }

  search(value: string) {
    this.term = value;
  }

}
