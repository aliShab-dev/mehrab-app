export interface SubCategory {
  subCatName: string;
  subCatId: number;
}

export interface Category {
  categoryName: string;
  categoryId: number;
  subCatList: SubCategory[];
}

export type Categories = Category[];



