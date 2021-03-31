import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PeopleService } from '../people/people.service';
import { Person } from '../people/person.model';
import { MemoriesService } from './memories.service';
import { Memory } from './memory.model';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.component.html',
  styleUrls: ['./memories.component.css']
})
export class MemoriesComponent implements OnInit {
  memories: Memory[] = [];
  subscriptionMemories: Subscription;
  subscriptionPerson: Subscription;
  personId: number;
  person: Person = null;
  constructor(private memoryService: MemoriesService, private router: Router, 
    private activeRoute: ActivatedRoute, private personService: PeopleService) { }

    
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.memoryService.getPersonMemories(params['id']);
      this.personId = params['id'];
      this.personService.getPerson(this.personId);
    });

    this.subscriptionPerson = this.personService.personChangedEvent.subscribe(
      (person: Person) => {
        this.person = person;
        console.log(person);
      }
    )

    this.subscriptionMemories = this.memoryService.memoryListChangedEvent.subscribe(
      (memories: Memory[]) => {
        this.memories = memories;
      }
    )
  }

  ngOnDestroy() {
    this.subscriptionMemories.unsubscribe();
    this.subscriptionPerson.unsubscribe();
  }
}
