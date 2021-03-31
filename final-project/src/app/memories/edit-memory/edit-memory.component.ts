import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MemoriesService } from '../memories.service';
import { Memory } from '../memory.model';

@Component({
  selector: 'app-edit-memory',
  templateUrl: './edit-memory.component.html',
  styleUrls: ['./edit-memory.component.css']
})
export class EditMemoryComponent implements OnInit {
  @ViewChild('editForm', { read: ElementRef }) editForm: ElementRef;
  personId: number;
  memoryId: number;
  memoryEdit: Memory;
  subscription: Subscription;
  constructor(private memoryService: MemoriesService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.personId = this.memoryService.personId;
    this.activeRoute.params.subscribe((params: Params) => {
      this.memoryId = params['memoryId'];
      this.memoryService.getMemory(this.memoryId);
      this.memoryEdit = this.memoryService.selectedMemory;
    });

    this.subscription = this.memoryService.memoryChangedEvent.subscribe(
      (memory: Memory) => {
        this.memoryEdit = memory;

        this.editForm.nativeElement.year.value = this.memoryEdit.year;
        this.editForm.nativeElement.event.value = this.memoryEdit.event;
      }
    )
  }

  onSubmit() {
    const year = this.editForm.nativeElement.year.value;
    const event = this.editForm.nativeElement.event.value;
    const memory = new Memory( event, year);
    
    this.memoryService.updateMemory(this.memoryId, memory);
  }

}
