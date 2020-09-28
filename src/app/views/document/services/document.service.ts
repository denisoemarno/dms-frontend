import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from 'src/app/views/document/models/document';
import { WorkFlow } from '../models/workflow';
import { Tags } from '../../tags/models/tags';

const API_URL = environment.server + 'documents/';
const API_URL_CAMUNDAH = environment.camundah + 'api/wordeditor/';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  constructor(private http: HttpClient) { }

  getDocument(q: string = '', offset: number = 1, limit: number = 10): Observable<Document[]> {
    const url = API_URL + '?q=' + q + '&limit=' + limit + '&offset=' + offset;
    return this.http.get<Document[]>(url);
  }

  add(document: Document) {
    return this.http.post<Document>(API_URL, document);
  }

  delete(document: Document) {
    return this.http.request('delete', API_URL + document.id);
  }

  update(document: Document) {
    return this.http.put<Document>(API_URL + document.id, document);
  }

  getbyid(id: number): Observable<Document> {
    const url = API_URL + id;
    return this.http.get<Document>(url);
  }

  approvebyid(id: number, body: any) {
    const url = API_URL + 'approval/' + id;
    return this.http.put<any>(url, body);
  }

  approvebyidupload(id: number, body: any, file: File[]) {
    const fd: FormData = new FormData();

    file.forEach(f => {
      fd.append('files', f);
    });
    fd.append('tags', body.tags);
    fd.append('parameter', body.parameter);
    const url = API_URL + 'approvalS4/' + id;
    /*
    const data = { parameter : body.parameter , tags : body.tags };
    console.log(data);
    */
    return this.http.put<any>(url, fd);
  }

  getworkflow(workflowstatus: string): Observable<WorkFlow[]> {
    const url = API_URL + 'parameter/workflow?workflowStatus=' + workflowstatus;
    return this.http.get<WorkFlow[]>(url);
  }

  getmytask(q: string = '', offset: number = 1, limit: number = 10): Observable<Document[]> {
    const url = API_URL + 'task/me?q=' + q + '&limit=' + limit + '&offset=' + offset;
    return this.http.get<Document[]>(url);
  }

  getownertask(q: string = '', offset: number = 1, limit: number = 10): Observable<Document[]> {
    const url = API_URL + 'owner/me?q=' + q + '&limit=' + limit + '&offset=' + offset;
    return this.http.get<Document[]>(url);
  }

  getdocumentview(name: string) {
    const url = API_URL + 'view/' + name;
    return this.http.get<any>(url);
  }
  getdocumentviewjava(file: File[]): Observable<any> {
    const fd: FormData = new FormData();

    file.forEach(f => {
      fd.append('files', f);
    });
    const url = API_URL_CAMUNDAH + 'Import/';
    return this.http.post<any>(url, fd);
  }
}
