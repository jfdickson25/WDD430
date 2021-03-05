import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) {
    this.documents = this.getDocuments();
  }

  getDocuments(): Document[] {
    this.http.get<Document[]>('https://welearncms-default-rtdb.firebaseio.com/documents.json')
    .subscribe( (documents: Document[]) => {
      this.documents = documents;
      this.maxDocumentId = this.getMaxId();
      this.documents.sort();
      this.documentListChangedEvent.next(this.documents.slice());
    }, (error:any) => {
      console.log(error);
    })

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
    this.storeDocuments();
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

  storeDocuments() {
    const documents = JSON.stringify(this.documents);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    this.http.put('https://welearncms-default-rtdb.firebaseio.com/documents.json', documents, {'headers': headers})
    .subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }

  addDocument(newDocument: Document) {
    if(newDocument === null) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);

    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if(originalDocument === null || newDocument === null) {
      return;
    }

    console.log(this.documents)

    const pos: number = this.documents.indexOf(originalDocument);

    console.log(pos);

    if(pos < 0) {
      return;
    }

    console.log("New document: ", newDocument, "Old document: ", originalDocument)

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }
}
