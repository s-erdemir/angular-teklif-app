import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  url = 'https://localhost:7155/api/Offers';

  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.url);
  }

  AddOffer(model: Offer): Observable<Offer[]> {
    return this.http.post<Offer[]>(this.url + '/PostOffer', model);
  }

  deleteOffer(id: number) {
    return this.http.delete<Offer>(this.url + '/DeleteOffer/' + id);
  }

  getOffer(id: string | undefined | null): Observable<Offer> {
    return this.http.get<Offer>(this.url + '/GetOffer/' + id)
  }

  updateOffer(id: string | undefined | null , model:Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.url}/PostOffer/${id}`,model);
  }
}
