import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentTypes } from '../models/documenttype';

const API_URL = environment.server + 'document-type/';

@Injectable({
  providedIn: 'root',
})
export class DocumentTypeService {
  constructor(private http: HttpClient) {}

  getDocumentType(q: string = '', offset: number = 1, limit: number = 10): Observable<DocumentTypes[]> {
    const url = API_URL + '?q=' + q + '&limit=' + limit + '&offset=' + offset;
    return this.http.get<DocumentTypes[]>(url);
  }

  add(DocumentType: DocumentTypes) {
    return this.http.post<DocumentTypes>(API_URL, DocumentType);
  }

  delete(DocumentType: DocumentTypes) {
    return this.http.request('delete', API_URL + DocumentType.id);
  }

  update(DocumentType: DocumentTypes) {
    return this.http.put<DocumentType>(API_URL + DocumentType.id, DocumentType);
  }
}
