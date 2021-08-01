import { SavedCard } from 'src/app/Models/SavedCard.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SavedCardService {
  apiEndPoint: string;
  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.apiEndPointUrl;
  }

  getSavedCards(): Observable<SavedCard[]> {
    return this.http.get<SavedCard[]>(`${this.apiEndPoint}`).pipe(
      map((data) => data.map((res) => new SavedCard().deserialize(res))),
      catchError((err) => {
        return of([]);
      })
    );
  }

  saveNewCard(cardDetails: SavedCard): Observable<SavedCard> {
    return this.http.post<SavedCard>(`${this.apiEndPoint}`, cardDetails);
  }

  removeCard(cardId: number): Observable<any> {
    return this.http.delete(`${this.apiEndPoint}/${cardId}`);
  }
}
