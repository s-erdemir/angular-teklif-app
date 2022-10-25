import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Condition } from 'src/app/models/condition';
import { Customer } from 'src/app/models/customer';
import { Explanation } from 'src/app/models/explanation';
import { Offer } from 'src/app/models/offer';
import { Prepared } from 'src/app/models/prepared';
import { Product } from 'src/app/models/product';
import { TotalPrice } from 'src/app/models/totalprice';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss']
})
export class OfferViewComponent implements OnInit {

  edit: string = '';
  title: string = '';

  ID: string | null | undefined;

  companyname = new FormControl('', [Validators.required]);

  constructor(private offerService: OfferService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.ID = params.get('id');
        if (this.ID === "PostOffer") {
          console.log("kayıt yok");
          this.edit = 'Kaydet';
          this.title = 'Teklif Oluştur';
        }
        else {
          console.log("kayıt var");
          this.edit = 'Güncelle';
          this.title = 'Teklifi Düzenle';
          this.offerService.getOffer(this.ID).subscribe(
            (next) => {
              this.offer = next;
              this.products = next.products;
              this.explanations = next.explanations;
            },
            (err) => { }
          )
        }
      },
      (err) => { }
    )
  }

  productsForm = new FormGroup({
    id: new FormControl(''),
    productName: new FormControl('', [Validators.required]),
    unitPrice: new FormControl('', [Validators.required]),
    stockAmount: new FormControl('', [Validators.required])
  })

  product: Product = {
    id: 0,
    offerId: 0,
    productName: '',
    stockAmount: 0,
    unitPrice: 0
  }

  products: Product[] = [];

  x: number = 0;
  total: number = 0;

  addProduct() {
    this.x += 1;
    this.productsForm.get('id')?.setValue(this.x);
    this.products.push(this.productsForm.value);
    this.total = (this.totalpriceForm.get('vat')?.value * (this.product.stockAmount * this.product.unitPrice)) / 100 + (this.product.stockAmount * this.product.unitPrice);
    this.totalpriceForm.get('total')?.setValue(this.total);
    this.total = 0;

  }

  deleteProduct(id: any) {
    var index = this.products.indexOf(this.products.filter(i => i.id == id)[0]);
    this.products.splice(index, 1);
    console.log(index);
  }

  customer: Customer = {
    id: 0,
    companyName: '',
    offerId: 0
  }

  customers: Customer[] = [];

  preparedForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required])
  })

  prepared: Prepared = {
    id: 0,
    offerId: 0,
    date: '',
    name: ''
  }

  prepareds: Prepared[] = [];

  totalprice: TotalPrice = {
    id: 0,
    offerId: 0,
    total: 0,
    vat: 0
  }

  totalprices: TotalPrice[] = [];

  totalpriceForm = new FormGroup({
    vat: new FormControl('', [Validators.required]),
    // total: new FormControl('')
  })

  explanation: Explanation = {
    id: 0,
    offerId: 0,
    comment: '',
    title: ''
  }

  explanations: Explanation[] = [];

  explanationForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required])
  })

  y: number = 0;

  addExplanation() {
    this.y += 1;
    this.explanationForm.get('id')?.setValue(this.y);
    this.explanations.push(this.explanationForm.value);
    console.log(this.explanations);
  }

  deleteExplanation(id: any) {
    var index = this.explanations.indexOf(this.explanations.filter(i => i.id == id)[0]);
    this.explanations.splice(index, 1);
  }

  condition: Condition = {
    id: 0,
    offerId: 0,
    requirement: ''
  }

  conditions: Condition[] = [];

  conditionForm = new FormGroup({
    id: new FormControl(''),
    requirement: new FormControl('', [Validators.required])
  })

  z: number = 0;

  addRequirement() {
    this.z += 1;
    this.conditionForm.get('id')?.setValue(this.z);
    this.conditions.push(this.conditionForm.value);
  }

  deleteRequirement(id: any) {
    var index = this.conditions.indexOf(this.conditions.filter(i => i.id == id)[0]);
    this.conditions.splice(index, 1);
  }

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

  Route() {
    if (this.edit === 'Kaydet') {
      this.Add();
    }
    else this.Update();
  }

  Add() {

    this.products.forEach(products => { products.id = 0 });
    this.explanations.forEach(explanation => { explanation.id = 0 });
    this.conditions.forEach(condition => { condition.id = 0 });

    this.totalprices.push(this.totalprice);
    this.customers.push(this.customer);
    this.prepareds.push(this.preparedForm.value);
    debugger;
    this.offer.prepareds = this.prepareds;
    this.offer.totalPrices = this.totalprices;
    debugger;
    this.offer.explanations = this.explanations;
    this.offer.conditions = this.conditions;
    this.offer.offerName = this.customer.companyName;
    this.offer.products = this.products;
    this.offer.customers = this.customers;

    this.offerService.AddOffer(this.offer).subscribe(
      (next) => {
        console.log(next);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  Update() {
    debugger;
    this.totalprices.push(this.totalprice);
    this.offer.totalPrices = this.totalprices;
    this.prepareds.push(this.prepared);
    this.offer.prepareds = this.prepareds;
    this.customers.push(this.customer);
    this.offer.offerName = this.customer.companyName;
    this.offer.products = this.products;
    this.offer.customers = this.customers;

    this.offerService.updateOffer(this.ID, this.offer).subscribe(
      (next) => {
        debugger;
        this.offer = next;
        console.log(next);
      },
      (err) => { }
    )
  }


}
