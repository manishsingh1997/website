import { Order } from '../types';

export type AppOrdersListPageProps = {
  getOrders: (customerGID: string) => void,
  isListLoading: boolean,
  listError: Error[] | null,
  orders: Order[],
}
