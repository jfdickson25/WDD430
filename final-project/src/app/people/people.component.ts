import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Subscription } from 'rxjs';
import { PeopleService } from './people.service';
import { Person } from './person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: Person[] = [];
  subscription: Subscription;
  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.people = this.peopleService.people;
    this.subscription = this.peopleService.peopleListChangedEvent.subscribe(
      (people: Person[]) => {
        this.people = people;
      }
    )
  }

}
