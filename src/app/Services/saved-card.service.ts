import { SavedCard } from 'src/app/Models/SavedCard.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.http
      .get<SavedCard[]>(`${this.apiEndPoint}`)
      .pipe(map((data) => data.map((res) => new SavedCard().deserialize(res))));
  }

  saveNewCard(cardDetails: SavedCard): Observable<SavedCard> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<SavedCard>(`${this.apiEndPoint}`, cardDetails, {
      headers,
    });
  }

  removeCard(cardId: number): Observable<any> {
    return this.http.delete(`${this.apiEndPoint}/${cardId}`);
  }
}
