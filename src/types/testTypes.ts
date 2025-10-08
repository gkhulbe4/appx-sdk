export type FeaturedDiscount = {
  id: string;
  coupon_code: string;
  apply_on_ext: string;
  percent_off: string;
  flat_price: string;
  user_id: string;
  item_id: string;
  item_type: string;
  start_date: string;
  expiry_date: string;
  enable: string;
  enable_countdown_timer: string;
  countdown_time: string;
  count: string;
  maxcount: string;
  minimum_order_value: string;
  once_per_user: string;
  maxdiscount: string;
  is_cart_coupon: string;
  is_emi_coupon: string;
  pricing_plan_id: string;
  purchase_item_id: string;
  purchase_item_type: string;
  route_account: string;
  route_account_percentage: string;
  currency: string;
  coupon_type: string;
  deleted: string;
  user_type: string;
};

export type TestSeries = {
  id: string;
  title: string;
  testseries_slug: string;
  exam: string;
  examname: string;
  logo: string;
  banner: string;
  demo_pdf_url: string;
  demo_video_url: string;
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
  is_paid: number;
  featured_discounts: FeaturedDiscount[];
};

export type TestSeriesResponse = {
  status: number;
  message: string;
  msg: string;
  total: number;
  data: TestSeries[];
};

export type Subject = {
  subjectid: string;
  subject_name: string;
  subject_logo?: string;
  is_paid?: number;
  sortingparam?: string;
};

export type SubjectsResponse = {
  status: number;
  message: string;
  data: Subject[];
};
