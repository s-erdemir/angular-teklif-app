import { Condition } from "./condition";
import { Customer } from "./customer";
import { Explanation } from "./explanation";
import { Prepared } from "./prepared";
import { Product } from "./product";
import { TotalPrice } from "./totalprice";

export class Offer {
  id: number = 0;
  offerName: string = '';
  products: Product[] = [];
  conditions: Condition[] = [];
  customers: Customer[] = [];
  explanations: Explanation[] = [];
  prepareds: Prepared[] = [];
  totalPrices: TotalPrice[] = [];
}
