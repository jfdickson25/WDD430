import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemoriesService } from '../memories.service';
import { Memory } from '../memory.model';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.css']
})
export class MemoryComponent implements OnInit {
  @Input() memory: Memory;
  personId: number;
  constructor(private memoriesService: MemoriesService, private router: Router) { }

  ngOnInit(): void {
    this.personId = this.memoriesService.personId;
  }

  onDelete(memory: Memory) {
    this.memoriesService.deleteMemory(memory);
    this.router.navigate([`/memories/${this.personId}`]);
  }

}
