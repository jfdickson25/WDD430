import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [
    new Document("1", "Document1", "A great document", "#", null )
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
