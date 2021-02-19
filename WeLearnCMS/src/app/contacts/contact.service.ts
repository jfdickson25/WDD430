import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find(contact => contact.id === id);
  }

  deleteContact(contact: Contact): void {
    if (!contact) {
      return;
   }
   const pos = this.contacts.indexOf(contact);
   if (pos < 0) {
      return;
   }
   this.contacts.splice(pos, 1);
   this.contactListChangedEvent.next(this.contacts.slice());

  }

  getMaxId(): number {

    let maxId = 0;

    for(let contact of this.contacts) {
        let currentId = +contact.id; 
        if (currentId > maxId) {
            maxId = currentId
        }
    }
    return maxId
  }

  addContact(newContact: Contact) {
    if(newContact === null) {
      return;
    }

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();

    this.contactListChangedEvent.next(contactsListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if(originalContact === null || newContact === null) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);

    if(pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

}
