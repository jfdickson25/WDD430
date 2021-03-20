import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

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
    this.http.get<Contact[]>('http://localhost:3000/contacts')
    .subscribe( (contacts: Contact[]) => {
      this.contacts = contacts;
      this.maxContactId = this.getMaxId();
      this.contacts.sort();
      this.contactListChangedEvent.next(this.contacts.slice());
    }, (error:any) => {
      console.log(error);
    })
  }

  sortAndSend() {
    this.contacts.sort();
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  getContact(id: string) {
    for (let contact of this.contacts) {
      console.log("contact id: ", contact.id, " id sent in: ", id)
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {

    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
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

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // make sure id of the new Contact is empty
    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new contact to contacts
          this.contacts.push(responseData.contact);
          this.sortAndSend();
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.sortAndSend();
        }
      );
  }

}
