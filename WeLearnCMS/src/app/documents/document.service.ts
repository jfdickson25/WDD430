import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  maxDocumentId: number;
  documentSelectedEvent = new Subject<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  constructor(private http: HttpClient) {
    this.getDocuments();
  }

  getDocuments() {
    this.http.get<Document[]>('http://localhost:3000/documents')
    .subscribe( (documents: Document[]) => {
      console.log("Documents: ", documents);
      this.documents = documents;
      this.maxDocumentId = this.getMaxId();
      this.documents.sort();
      this.documentListChangedEvent.next(this.documents.slice());
    }, (error:any) => {
      console.log(error);
    })
  }

  sortAndSend() {
    this.documents.sort();
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getDocument(id: string): Document {
    return this.documents.find(document => document.id === id);
  }

  
  deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        }
      );
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

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      );
  }
}
