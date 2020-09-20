export interface City {
  id: number;
  city: string;
  start_date: string;
  end_date: string;
  price: number;
  status: 'Seldom' | 'Monthly' | 'Yearly' | 'Often' | 'Never' | 'Once' | 'Weekly';
  color: string;
}
