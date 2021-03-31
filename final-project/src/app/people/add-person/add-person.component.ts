import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PeopleService } from '../people.service';
import { Person } from '../person.model';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  @ViewChild('addForm', { read: ElementRef }) addForm: ElementRef;
  constructor(private peopleService: PeopleService ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let firstName = this.addForm.nativeElement.firstName.value;
    let lastName = this.addForm.nativeElement.lastName.value;
    let imgUrl = this.addForm.nativeElement.imgUrl.value;
    const person = new Person( firstName, lastName, imgUrl, []);

    this.peopleService.addPerson(person);
    this.addForm.nativeElement.firstName.value = '';
    this.addForm.nativeElement.lastName.value = '';
    this.addForm.nativeElement.imgUrl.value = '';
  }

}
