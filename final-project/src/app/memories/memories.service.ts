import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Memory } from './memory.model';
import { Subject } from 'rxjs';
import { Person } from '../people/person.model';

@Injectable({
  providedIn: 'root'
})
export class MemoriesService {
  memoryListChangedEvent = new Subject<Memory[]>();
  memoryChangedEvent = new Subject<Memory>();
  memories: Memory[];
  personId: number;
  selectedMemory: Memory;

  constructor(private http: HttpClient) {
  }

  getPersonMemories(id) {
    this.http.get<Person>(`http://localhost:5000/memories/${id}`)
    .subscribe( (person: Person) => {
      this.personId = id;
      this.memories = person.memories;
      this.memoryListChangedEvent.next(this.memories.slice());
      }, (error:any) => {
      console.log(error);
    })
  }

  getMemory(id) {
    this.http.get<Memory>(`http://localhost:5000/memories/memory/${id}`)
    .subscribe( (memory: Memory) => {
      this.selectedMemory = memory;
      this.memoryChangedEvent.next(this.selectedMemory);
      }, (error:any) => {
      console.log(error);
    })
  }

  addMemory(memory: Memory) {
    this.http.post<Memory>(`http://localhost:5000/memories/memory/${this.personId}`, memory)
    .subscribe((memory: Memory) => {
        this.memories.push(memory);
        this.memoryListChangedEvent.next(this.memories.slice());
    }, (error:any) => {
      console.log(error);
    })
  }

  updateMemory(id:number, updatedMemory:Memory) {
    this.http.put<Memory>(`http://localhost:5000/memories/memory/${id}`, updatedMemory)
    .subscribe((memory: Memory) => {
        const pos = this.memories.findIndex(d => d._id === memory._id);

        if (pos < 0) {
          return;
        }
        this.memories[pos] = memory;
        this.memoryListChangedEvent.next(this.memories.slice());
    }, (error:any) => {
      console.log(error);
    })
  }

  deleteMemory(memory: Memory) {
    if (!memory) {
      return;
    }

    const pos = this.memories.findIndex(d => d._id === memory._id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:5000/memories/memory/' + this.personId + '/' + memory._id)
      .subscribe(
        (response: Response) => {
          this.memories.splice(pos, 1);
          this.memoryListChangedEvent.next(this.memories.slice());
        }
      );
  }
}
