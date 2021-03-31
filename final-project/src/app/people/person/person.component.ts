import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MemoriesService } from 'src/app/memories/memories.service';
import { PeopleService } from '../people.service';
import { Person } from '../person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  @Input() person: Person;
  constructor(private peopleService: PeopleService, private memoriesService: MemoriesService, private router: Router) { }

  ngOnInit(): void {
  }

  onDelete() {
    this.peopleService.deletePerson(this.person);
    this.router.navigate([`/people`]);
  }

  onEdit() {
    this.router.navigate([`/people/edit/${this.person._id}`]);
  }
}
