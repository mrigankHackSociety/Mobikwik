import { SavedCard } from './../Models/SavedCard.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SavedCardService {
  constructor(private http: HttpClient) {}

  getSavedCards(): Observable<SavedCard[]> {
    return this.http
      .get<SavedCard[]>('http://localhost:3000/cards')
      .pipe(
        map((data) => data.map((data) => new SavedCard().deserialize(data)))
      );
  }
}
