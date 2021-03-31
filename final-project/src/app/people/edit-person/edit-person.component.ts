import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Mongoose } from 'mongoose';
import { Subscription } from 'rxjs';
import { PeopleService } from '../people.service';
import { Person } from '../person.model';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {
  personEditId: number;
  personEdit: Person;
  subscription: Subscription;
  @ViewChild('editForm') editForm;
  constructor(private peopleService: PeopleService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.personEditId = params['id'];
      this.peopleService.getPerson(this.personEditId);
    });

    this.subscription = this.peopleService.personChangedEvent.subscribe(
      (person: Person) => {
        this.personEdit = person;

        this.editForm.nativeElement.firstName.value = this.personEdit.firstName;
        this.editForm.nativeElement.lastName.value = this.personEdit.lastName;
        this.editForm.nativeElement.imgUrl.value = this.personEdit.imgUrl;
      }
    )
  }

  onSubmit() {
    const firstName = this.editForm.nativeElement.firstName.value;
    const lastName = this.editForm.nativeElement.lastName.value;
    const imgUrl = this.editForm.nativeElement.imgUrl.value;
    const person = new Person( firstName, lastName, imgUrl, this.personEdit.memories);
    
    this.peopleService.updatePerson(this.personEditId, person);
  }

}
