import { Button } from "@chakra-ui/react";

type CategoryCardProps = {
  category: string;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
};

export function CategoryCard({
  category,
  selectedCategories,
  toggleCategory,
}: CategoryCardProps) {
  const isActive = selectedCategories?.includes(category);

  return (
    <Button
      borderRadius="lg"
      px={4}
      py={2}
      variant={isActive ? "solid" : "outline"}
      colorScheme="brand"
      size="sm"
      onClick={() => toggleCategory(category)}
    >
      {category}
    </Button>
  );
}
