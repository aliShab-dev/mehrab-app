import { FileType } from "@/component/adminPage/components/tabs/Graphic";

export type Product = {
  id: number;
  name: string;
  description: string;
  file: string;
  files: FileType[];
  company: string;
  poster: string | null;
  episode: number | null;
  staff_data: { name: string; role: string; image: string | null }[];
  level: string;
  category: string;
  sub_category: string;
  duration: string;
  created_at?: string;
  is_active?: boolean;
};

export type FetchedProduct = Product;

export type Subcategory = {
  id: number;
  created_at: string;
  name: string;
  category: string;
  category_id: number;
  is_active: boolean;
};



