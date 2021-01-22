import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {
  Contact
} from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact("1", "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771",
      "https://web.byui.edu/Directory/Employee/jacksonk.jpg", null),
    new Contact("2", "Rex Barzee", "barzeer@byui.edu", "208-496-3768",
      "https://web.byui.edu/Directory/Employee/barzeer.jpg", null),
    new Contact("3", "Jordan Dickson", "dic15015@byui.edu", "253-363-7622",
      "https://web.byui.edu/Directory/Employee/barzeer.jpg", null)
  ];
  constructor() {}

  ngOnInit(): void {}

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }

}