import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OfferService } from 'src/app/services/offer.service';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/models/offer';
import { Product } from 'src/app/models/product';
import { Customer } from 'src/app/models/customer';
import { Prepared } from 'src/app/models/prepared';
import { TotalPrice } from 'src/app/models/totalprice';
import { Explanation } from 'src/app/models/explanation';
import { Condition } from 'src/app/models/condition';
import html2pdf from '../../../../node_modules/html2pdf.js/dist/html2pdf';

@Component({
  selector: 'app-offer-pdf-export',
  templateUrl: './offer-pdf-export.component.html',
  styleUrls: ['./offer-pdf-export.component.scss']
})
export class OfferPdfExportComponent implements OnInit {

  constructor(private offerService: OfferService, private route: ActivatedRoute) {}

  ID: string | null | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.ID = params.get('id');
        console.log(this.ID);
        this.offerService.getOffer(this.ID).subscribe(
          (next) => {
            this.offer = next;
            this.offers.push(this.offer);
            this.totalprices = next.totalPrices;
            this.products = next.products;
            this.conditions = next.conditions;
            this.customers = next.customers;
            this.explanations = next.explanations;
            this.prepareds = next.prepareds;
            this.totalprices = next.totalPrices;

            this.prepared.name = next.prepareds[0].name;
            this.prepared.date = next.prepareds[0].date;

            this.totalprice.vat = next.totalPrices[0].vat;

            console.log(next);

            //this.totalprice.vat = next.totalprices[0].vat;

            this.subTotal();

          },
          (err) => {
            console.log(err);
          }
        )
      },
      (err) => { }
    )
  }

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

  offers: Offer[] = [];

  product: Product = {
    id: 0,
    offerId: 0,
    productName: '',
    stockAmount: 0,
    unitPrice: 0
  }

  products: Product[] = [];

  customer: Customer = {
    id: 0,
    companyName: '',
    offerId: 0
  }

  customers: Customer[] = [];

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

  explanation: Explanation = {
    id: 0,
    offerId: 0,
    comment: '',
    title: ''
  }

  explanations: Explanation[] = [];

  condition: Condition = {
    id: 0,
    offerId: 0,
    requirement: ''
  }

  conditions: Condition[] = [];

  y = 0;
  z = 0;

  subTotal() {
    this.products.forEach(element => {
      this.y = (element.stockAmount ?? 0) * element.unitPrice;
      this.z += this.y;
    });
  }

  // public openPDF(): void {

  //   let DATA: any = document.getElementById('htmlData');

  //   html2canvas(DATA).then((canvas) => {

  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     const FILEURI = canvas.toDataURL('image/png');
  //     let PDF = new jsPDF('p', 'mm', 'a4');
  //     let position = 0;
  //     // var requiredPages = 2
  //     // for (var i = 0; i < requiredPages; i++) {
  //     //   PDF.addPage();
  //     // }
  //     PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
  //     PDF.save('angular-demo.pdf');

  //   });


  // }



  //@ViewChild('pdfElement') pdfEl!: ElementRef;

  options = {
    margin: 1,
    filename: 'newfile.pdf' + `${this.offer.offerName}`,
    image: {
      type: 'jpeg',
      quality: '1',
    },
    html2canvas: {
      scale: 2
    },
    pagebreak: { before: '.beforeClass', after: ['#after1', '#after2'], avoid: 'img' },
    jsPDF: {
      unit: 'in',
      format: 'a4',
      orientation: 'portrait',
      compressPDF: true
    }
  }
  generatePdf() {
    const pEl = document.getElementById('htmlData');
    html2pdf().from(pEl).set(this.options).toPdf()
      .get('pdf').then(function (pdf) {
        var totalPages = pdf.internal.getNumberOfPages();

        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.setFontSize(8);
          pdf.setTextColor(150);
          pdf.text(15, 15, '[SULIT]');
          pdf.text('Tarikh Cetakan: <?=trim(date("d/m/Y h:i A"));?> | Mukasurat: ' + i + '/' + totalPages + '', pdf.internal.pageSize.getWidth() - 85, pdf.internal.pageSize.getHeight() - 8);
        }
      }).save()
  }
}
