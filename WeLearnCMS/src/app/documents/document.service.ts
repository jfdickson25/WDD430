import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  maxDocumentId: number;
  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find(document => document.id === id);
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
 }
 
  getMaxId(): number {

    let maxId = 0;

    for(let document of this.documents) {
        let currentId = +document.id; 
        if (currentId > maxId) {
            maxId = currentId
        }
    }
    return maxId
  }

  addDocument(newDocument: Document) {
    if(newDocument === null) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice();

    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if(originalDocument === null || newDocument === null) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);

    if(pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
}
