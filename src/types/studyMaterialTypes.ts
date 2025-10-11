import { FeaturedDiscount } from "./testTypes";

export type StudyMaterialByType = {
  id: string;
  bharat_emi_price: string;
  demo_pdf: string;
  expiryDate: string;
  expiry_mode: string;
  featured_discounts: FeaturedDiscount[];
  free_status: string;
  image: string;
  is_pdf_encrypted: string;
  mrp: string;
  pdf_encryption_key: string;
  pdf_encryption_version: string;
  pdf_link: string;
  price: string;
  price_kicker: string;
  purchased_status: string;
  save_flag: string;
  title: string;
  validity: string;
  validity_type: string;
};
export type StudyMaterialByTypeResponse = {
  data: StudyMaterialByType[];
  message: string;
  msg: string;
  status: number;
  total: number;
};
