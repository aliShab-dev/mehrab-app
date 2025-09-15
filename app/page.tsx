import MainBanner from "@/component/mainBanner/MainBanner";
import MotionSection from "@/component/motionSection/MotionSection";
import FilmDocSection from "@/component/filmDocSection/FIlmDocSection";
import AudioSection from "@/component/audioSection/AudioSection";
import GraphicDesignSection from "@/component/graphicDesignSection/GraphicDesignSection";
import Comunity from "@/component/comunity/Cumunity";
import getCategories from "@/component/adminPage/service/getCat";

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

async function fetchCategoriesData() {
  try {
    const res = await getCategories();
    return res;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

function transformCategories(
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

export default async function Home() {
  const categories = await fetchCategoriesData();

  const transformedData = transformCategories(categories);

  return (
    <div>
      <main>
        <section>
          <MainBanner />
        </section>

        <section>
          <MotionSection categories={transformedData} />
        </section>

        <section>
          <FilmDocSection categories={transformedData} />
        </section>

        <section>
          <AudioSection />
        </section>

        <section>
          <GraphicDesignSection categories={transformedData} />
        </section>

        <section>
          <Comunity />
        </section>

        <div style={{ height: 100 }}></div>
      </main>
    </div>
  );
}
