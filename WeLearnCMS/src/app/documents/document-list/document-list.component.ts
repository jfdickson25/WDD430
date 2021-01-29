import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document("1", "Document1", "A great document part 1", "#", null ),
    new Document("2", "Document2", "A great document part 2", "#", null ),
    new Document("3", "Document3", "A great document part 3", "#", null ),
    new Document("4", "Document4", "A great document part 4", "#", null ),
    new Document("5", "Document5", "A great document part 5", "#", null ),
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument = (document: Document) => {
    this.selectedDocumentEvent.emit(document);
  }

}
