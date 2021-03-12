import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) {
    this.getContacts();
  }

  getContacts() {
    this.http.get<Contact[]>('https://welearncms-default-rtdb.firebaseio.com/contacts.json')
    .subscribe( (contacts: Contact[]) => {
      this.contacts = contacts;
      this.maxContactId = this.getMaxId();
      this.contacts.sort();
      this.contactListChangedEvent.next(this.contacts.slice());
    }, (error:any) => {
      console.log(error);
    })
  }

  storeContacts() {
    const contacts = JSON.stringify(this.contacts);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    this.http.put('https://welearncms-default-rtdb.firebaseio.com/contacts.json', contacts, {'headers': headers})
    .subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
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
   this.storeContacts();

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
    this.storeContacts();
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
    this.storeContacts();
  }

}
