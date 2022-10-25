import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferListComponent } from './components/offer-list/offer-list.component';
import { OfferPdfExportComponent } from './components/offer-pdf-export/offer-pdf-export.component';
import { OfferViewComponent } from './components/offer-view/offer-view.component';

const routes: Routes = [
  { path: 'offer-view/:id', component: OfferViewComponent },
  { path: 'offer-list', component: OfferListComponent },
  { path: '', redirectTo: '/offer-list', pathMatch: 'full' },
  { path: 'offer-pdf/:id', component: OfferPdfExportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
