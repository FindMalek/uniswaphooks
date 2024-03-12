import Container from "@component/overall/Container";
import HookGrid from "@component/showcase/hook/HookGrid";
import CollectionLinks from "@component/ui/CollectionLinks";

import { CategoryType, HookType } from "@/types/hook";

async function getHooks(category?: string) {
  const hooksFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_DEV}/api/hook`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    }
  );
  if (!hooksFetch.ok) {
    throw new Error("Failed to fetch hooks");
  }

  const hooks = await hooksFetch.json();

  if (category) {
    return hooks.data.filter((hook: HookType) => hook.categoryId === category);
  }

  return hooks.data;
}

async function getCategories() {
  const categoriesFetch = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL_DEV}/api/category`
  );

  if (!categoriesFetch.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories = await categoriesFetch.json();

  const hooks = await getHooks();
  categories.data.forEach((category: CategoryType) => {
    category.count = hooks.filter(
      (hook: HookType) => hook.category.id === category.id
    ).length;
  });

  return categories.data;
}

async function getCategoryData(slug: string) {
  const categories = await getCategories();
  const category = categories.find(
    (category: CategoryType) => category.id === slug
  );

  return category;
}

export async function generateMetadata({
  params,
}: {
  params: { collectionId: string };
}) {
  try {
    const data = await getCategoryData(params.collectionId);

    return {
      title: `${data.title} | UniswapHooks`,
      twitter: {
        title: `${data.title} | UniswapHooks`,
      },
    };
  } catch (error) {
    console.log("Error fetching collection data:", error);
  }
}

export default async function Page({
  params,
}: {
  params: { collectionId: string };
}) {
  const data = await getHooks(params.collectionId);
  const collections = await getCategories();

  const activeCategory = {
    category: "hooks",
    emoji: "🪝",
  };

  return (
    <Container classNames="py-8 lg:py-12 space-y-8 lg:space-y-12">
      <CollectionLinks
        activeCollection={params.collectionId}
        activeCategory={activeCategory}
        componentsData={collections.sort((a: CategoryType, b: CategoryType) =>
          a.createdAt < b.createdAt ? 1 : -1
        )}
      />

      <h3 className="text-3xl font-bold">{data[0].category.title}</h3>
      <HookGrid hookPosts={data} owned={false} />
    </Container>
  );
}