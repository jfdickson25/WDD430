import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'node:console';
import { Subject } from 'rxjs';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  people: Person[];
  person: Person;
  peopleListChangedEvent = new Subject<Person[]>();
  personChangedEvent = new Subject<Person>();
  constructor(private http: HttpClient) { 
    this.getPeople();
  }

  getPeople() {
    this.http.get<Person[]>('http://localhost:5000')
    .subscribe( (people: Person[]) => {
      this.people = people;
      this.peopleListChangedEvent.next(this.people.slice());
      }, (error:any) => {
      console.log(error);
    })
  }

  getPerson(id: number){
    this.http.get<Person>(`http://localhost:5000/${id}`)
    .subscribe( (person: Person) => {
        this.person = person;
        this.personChangedEvent.next(this.person);
      }, (error:any) => {
      console.log(error);
    })
  }

  addPerson(person: Person) {
    this.http.post<Person>('http://localhost:5000', person)
    .subscribe((person: Person) => {
        console.log(person);
        this.people.push(person);
        this.peopleListChangedEvent.next(this.people.slice());
    }, (error:any) => {
      console.log(error);
    })
  }

  updatePerson(id: number, person:Person) {
    this.http.put<Person>(`http://localhost:5000/${id}`, person)
    .subscribe((person: Person) => {
        const pos = this.people.findIndex(d => d._id === person._id);

        if (pos < 0) {
          return;
        }
        this.people[pos] = person;
        this.peopleListChangedEvent.next(this.people.slice());
    }, (error:any) => {
      console.log(error);
    })
  }

  deletePerson(person: Person) {
    if (!person) {
      return;
    }

    const pos = this.people.findIndex(d => d._id === person._id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:5000/' + person._id)
      .subscribe(
        (response: Response) => {
          this.people.splice(pos, 1);
          this.peopleListChangedEvent.next(this.people.slice());
        }
      );
  }
}
