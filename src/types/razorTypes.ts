export type RazorpayOptions = {
  key: string;
  currency: string;
  name: string;
  description: string;
  image: string;
  amount: number;
  order_id: string;
  payment_capture: number;
  notes: {
    base_url: string;
    user_id: string;
    item_type: string;
    item_id: string;
    amount: number;
    source: string;
  };
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  token: string;
};
