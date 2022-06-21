import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BarriosService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = 'https://pavii2022.azurewebsites.net/api/estudiantes';
  }
  get() {
    return this.httpClient.get(this.resourceUrl);
  }
}
