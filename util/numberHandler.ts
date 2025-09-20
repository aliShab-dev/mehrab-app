import { Categories, SubCategory } from "@/types/categories";

export function toPersianDigits(str: string) {
  return str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}


export function transformCategories(
  subCategories: {
    id: number;
    name: string;
    category: string;
    category_id: number;
  }[]
): Categories {
  const categoryMap = new Map<
    string,
    { categoryId: number; subCatList: SubCategory[] }
  >();

  subCategories.forEach((sub) => {
    const mainCatName = sub.category;
    const mainCatId = sub.category_id;

    if (!categoryMap.has(mainCatName)) {
      categoryMap.set(mainCatName, { categoryId: mainCatId, subCatList: [] });
    }

    categoryMap.get(mainCatName)!.subCatList.push({
      subCatName: sub.name,
      subCatId: sub.id,
    });
  });

  return Array.from(categoryMap.entries()).map(
    ([categoryName, { categoryId, subCatList }]) => ({
      categoryName,
      categoryId,
      subCatList,
    })
  );
}