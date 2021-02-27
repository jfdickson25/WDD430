import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  groupContacts: Contact[];
  contact: Contact;
  originalContact: Contact;
  editMode: boolean = false;
  contactId: string;
  contactInvalid: boolean = false;

  constructor( 
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.contactId = params['id'];
        if(this.contactId === null || this.contactId === undefined) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(this.contactId);

        if (this.originalContact === null || this.originalContact === undefined) {
          return;
        }

        this.editMode = true;
        this.contact = {...this.originalContact};

        if (this.contact.group) {
          this.groupContacts = this.contact.group; 
        }
        else this.groupContacts = [];
      }
    )
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    let newContact;

    if(this.editMode) {
      newContact = new Contact(
        this.originalContact.id,
        value.name,
        value.email, 
        value.phone,
        value.imageUrl,
        this.groupContacts
      );

      this.contactService.updateContact(this.originalContact, newContact);
    }
    else {
      newContact = new Contact(
        String(this.contactService.getMaxId() + 1),
        value.name,
        value.email, 
        value.phone,
        value.imageUrl,
        this.groupContacts
      );

      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  
  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      this.contactInvalid = true;
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      this.contactInvalid = true;
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id) {
        this.contactInvalid = true;
        return true;
      }
    }
    this.contactInvalid = false;
    return false;
  }

  
  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  
  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}
