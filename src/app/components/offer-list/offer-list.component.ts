import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/models/offer';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {

  offers: Offer[] = [];

  offer: Offer = {
    id: 0,
    offerName: '',
    products: [],
    conditions: [],
    customers: [],
    explanations: [],
    prepareds: [],
    totalPrices: []
  }

  constructor(private offerService: OfferService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.offerService.getOffers().subscribe(
      (next) => {
        this.offers = next;
      },
      (err) => {

      }
    )
  }

  Add() {
    this.offerService.AddOffer(this.offer).subscribe(
      (next) => {
        console.log(next);
      },
      (err) => {

      }
    )
  }

  DeleteOffer(id:number) {
    this.offerService.deleteOffer(id).subscribe(
      (next) => {
        this.getAll();
      },
      (err) => {}
    )
  }

}
