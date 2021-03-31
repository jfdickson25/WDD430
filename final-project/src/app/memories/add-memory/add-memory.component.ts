import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MemoriesService } from '../memories.service';
import { Memory } from '../memory.model';

@Component({
  selector: 'app-add-memory',
  templateUrl: './add-memory.component.html',
  styleUrls: ['./add-memory.component.css']
})
export class AddMemoryComponent implements OnInit {
  @ViewChild('addForm', { read: ElementRef }) addForm: ElementRef;
  personId: number;
  constructor(private memoryService: MemoriesService) { }

  ngOnInit(): void {
    this.personId = this.memoryService.personId;
  }

  onSubmit() {
    let year: number = this.addForm.nativeElement.year.value;
    let event: string = this.addForm.nativeElement.event.value;
    const memory = new Memory(event, year);
    console.log("Memory: ", memory);

    this.memoryService.addMemory(memory);
    this.addForm.nativeElement.year.value = '';
    this.addForm.nativeElement.event.value = '';
  }

}
