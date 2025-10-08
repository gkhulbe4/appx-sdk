export type TestSeries = {
  id: string;
  title: string;
  testseries_slug: string;
  exam: string;
  examname: string;
  logo: string;
  banner: string;
  description: string;
  offer_price: number;
  price: number;
  price_kicker: string;
  price_without_gst: string;
  validity: string;
  validity_type: string;
  feature_1: string;
  feature_2: string;
  feature_3: string;
  totaltesttitle: string;
  totaltestpdf: string;
  freetest: string;
  freetestpdf: string;
  paidtest: string;
  paidtestpdf: string;
  offline_test: string;
  bharat_emi_price: string;
  allow_payment: string;
  disable_discount_code: string;
  expiry_mode: string;
  end_date: string;
  gif_display: string;
  test_pass_compulsory: string;
  featured_discounts: any[]; // can refine if you know its structure
};

export type TestSeriesResponse = {
  status: number;
  message: string;
  msg: string;
  total: number;
  data: TestSeries[];
};
