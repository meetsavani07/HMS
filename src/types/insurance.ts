export interface Insurance {
  id: string;
  provider: string;
  planName: string;
  coverage: string;
  status: 'active' | 'inactive';
  startDate: string;
  endDate: string;
  buyerName: string;
  buyerContact: string;
}