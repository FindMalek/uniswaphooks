import Link from "next/link";
import ButtonStyle from "@component/ui/ButtonStyle";

import { CollectionLinksProps } from "@/types";

// activateCategory is an object with two properties: category and emoji
// e.g. { category: 'hooks', emoji: '🪝' }

export default async function CollectionLinks({
  activeCollection,
  activeCategory,
  componentsData,
}: CollectionLinksProps) {
  console.log("activeCategory", activeCategory);
  console.log("activeCollection", activeCollection[0]);
  console.log("componentsData", componentsData);
  return (
    <div>
      <ul className="flex gap-4">
        <li className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" role="img" className="text-sm">
            {activeCategory.emoji}
          </span>

          <span className="text-xs font-medium text-gray-900">
            {activeCategory.category.charAt(0).toUpperCase() +
              activeCategory.category.slice(1)}
          </span>
        </li>
      </ul>

      <ul className="mt-4 flex flex-wrap gap-1 ">
        {componentsData.map((componentData) => {
          const buttonText = componentData.count
            ? `${componentData.title} (${componentData.count})`
            : componentData.title;
            
          const isActive =
            (activeCategory.category === "hooks" &&
              activeCollection === componentData.id) ||
            (activeCategory.category === "Educational Resources" &&
              activeCollection === componentData.id);

          return (
            <li key={componentData.id} className="shrink-0 md:shrink">
              {activeCategory.category === "hooks" && (
                <Link
                  href={`/components/${componentData.category}/${componentData.id}`}
                >
                  <ButtonStyle
                    buttonEmoji={componentData.emoji}
                    buttonText={buttonText}
                    buttonActive={isActive}
                    isDark={false}
                    classAdd={""}
                  />
                </Link>
              )}

              {activeCategory.category === "tools" && (
                <Link href={`/tool/${componentData.id}`}>
                  <ButtonStyle
                    buttonEmoji={componentData.emoji}
                    buttonText={buttonText}
                    buttonActive={activeCollection[0] === componentData.id}
                    isDark={false}
                    classAdd={""}
                  />
                </Link>
              )}

              {activeCategory.category === "Educational Resources" &&
                activeCollection !== "new" && (
                  <Link href={`/community-hub/${componentData.id}`}>
                    <ButtonStyle
                      buttonEmoji={componentData.emoji}
                      buttonText={buttonText}
                      buttonActive={isActive}
                      isDark={false}
                      classAdd={""}
                    />
                  </Link>
                )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
