import { LoadingStatus } from './loadable';

export interface Product {
  id: number;
  name: string;
  price: number;
  countLeft: number;
  loadngStatus?: LoadingStatus;
}
