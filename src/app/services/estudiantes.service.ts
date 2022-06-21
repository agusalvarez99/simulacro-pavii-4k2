import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estudiantes } from '../models/estudiantes';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'https://pavii2022.azurewebsites.net/api/estudiantes/';
  }
  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  post(obj: Estudiantes) {
    return this.httpClient.post(this.resourceUrl, obj);
  }
}
