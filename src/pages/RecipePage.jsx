import {
  Box,
  Heading,
  Image,
  Text,
  Stack,
  Badge,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { ColorModeButton } from "../components/ui/color-mode";

export const RecipePage = ({ recipe, selectRecipe }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box minH="100vh" bg={{ base: "orange.200", _dark: "gray.900" }} py={4}
    pt={4}>
      <Box
        w="100%"
        maxW="760px"
        mx="auto"
        bg={{ base: "gray.50", _dark: "gray.800" }}
      >
        <Stack
          direction="row"
          align="center"
          justify="space-between"
          px={4}
          py={3}
          bg={{ base: "gray.50", _dark: "gray.800" }}
        >
          <Button
            variant="ghost"
            bg={{ base: "transparent", _dark: "gray.700" }}
            onClick={() => selectRecipe()}
            p={0}
            minW="auto"
          >
            <Image src="/back-arrow.png" alt="Back" boxSize="22px" />
          </Button>

          <Box textAlign="center">
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              color="orange.500"
              lineHeight="1"
            >
              RECIPE
            </Text>
          </Box>

          <ColorModeButton />
        </Stack>

        <Image
          src={recipe.image}
          alt={recipe.label}
          w="100%"
          h={{ base: "220px", md: "230px" }}
          objectFit="cover"
          objectPosition="center"
        />

        <Box px={{ base: 6, md: 8 }} py={{ base: 6, md: 6 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={12}>
            <Stack direction="column" gap={1} align="stretch">
              <Text
                fontSize="sm"
                fontWeight="medium"
                textTransform="uppercase"
                color={{ base: "gray.500", _dark: "gray.300" }}
              >
                {recipe.mealType[0]}
              </Text>

              <Heading fontSize={{ base: "xl", md: "2xl" }} lineHeight="1">
                {recipe.label}
              </Heading>

              <Stack pt={1} direction="column" gap={1} align="stretch">
                <Text fontSize="md">
                  Dish type:{" "}
                  <Text as="span" fontWeight="medium">
                    {recipe.dishType[0]}
                  </Text>
                </Text>

                {recipe.totalTime > 0 && (
                  <Text fontSize="md">
                    Total cooking time:{" "}
                    <Text as="span" fontWeight="medium">
                      {recipe.totalTime < 60
                        ? `${recipe.totalTime} minutes`
                        : `${Math.floor(recipe.totalTime / 60)} hour${
                            Math.floor(recipe.totalTime / 60) > 1 ? "s" : ""
                          }${
                            recipe.totalTime % 60
                              ? ` ${recipe.totalTime % 60} minutes`
                              : ""
                          }`}
                    </Text>
                  </Text>
                )}

                <Text fontSize="md">
                  Servings:{" "}
                  <Text as="span" fontWeight="medium">
                    {recipe.yield}
                  </Text>
                </Text>
              </Stack>

              <Box pt={2}>
                <Text fontSize="xl" fontWeight="medium" mb={2}>
                  Ingredients:
                </Text>

                <Stack direction="column" gap={2} align="stretch">
                  {recipe.ingredientLines.map((ingredient) => (
                    <Text key={ingredient} fontSize="md">
                      {
                        ingredient.replace("*", "")
                        // i did not like that the porkchop recipe was the
                        // only recipe with * in front of each ingredient.
                      }
                    </Text>
                  ))}
                </Stack>
              </Box>
            </Stack>

            <Stack direction="column" gap={3} align="stretch">
              <Box>
                <Text fontSize="md" fontWeight="medium" mb={2}>
                  Health labels:
                </Text>

                <Stack direction="row" flexWrap="wrap" gap="2">
                  {recipe.healthLabels.map((healthLabel) => (
                    <Badge
                      key={healthLabel}
                      colorPalette="purple"
                      fontSize="sm"
                      fontWeight="bold"
                      textTransform="uppercase"
                      px={0.5}
                      py={0.5}
                      letterSpacing="0.5px"
                    >
                      {healthLabel}
                    </Badge>
                  ))}
                </Stack>
              </Box>

              {recipe.dietLabels.length > 0 && (
                <Box>
                  <Text fontSize="md" fontWeight="medium" mb={2}>
                    Diet:
                  </Text>

                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {recipe.dietLabels.map((dietLabel) => (
                      <Badge
                        key={dietLabel}
                        colorPalette="green"
                        fontSize="sm"
                        fontWeight="bold"
                        textTransform="uppercase"
                        px={2}
                        py={1}
                      >
                        {dietLabel}
                      </Badge>
                    ))}
                  </Stack>
                </Box>
              )}

              {recipe.cautions.length > 0 && (
                <Box>
                  <Text fontSize="md" fontWeight="medium" mb={2}>
                    Cautions:
                  </Text>

                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {recipe.cautions.map((caution) => (
                      <Badge
                        key={caution}
                        colorPalette="red"
                        fontSize="sm"
                        fontWeight="bold"
                        textTransform="uppercase"
                        px={2}
                        py={1}
                      >
                        {caution}
                      </Badge>
                    ))}
                  </Stack>
                </Box>
              )}

              <Box pt={1}>
                <Text fontSize="lg" fontWeight="medium" mb={2}>
                  Total nutrients:
                </Text>

                <SimpleGrid columns={3} gap={3}>
                  <Box>
                    <Text fontSize="md">
                      {Math.round(recipe.totalNutrients.ENERC_KCAL.quantity)}
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      textTransform="uppercase"
                    >
                      Calories
                    </Text>
                  </Box>

                  <Box>
                    <Text fontSize="md">
                      {Math.round(recipe.totalNutrients.CHOCDF.quantity)} g
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      textTransform="uppercase"
                    >
                      Carbs
                    </Text>
                  </Box>

                  <Box>
                    <Text fontSize="md">
                      {Math.round(recipe.totalNutrients.PROCNT.quantity)} g
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      textTransform="uppercase"
                    >
                      Protein
                    </Text>
                  </Box>

                  <Box>
                    <Text fontSize="md">
                      {Math.round(recipe.totalNutrients.FAT.quantity)} g
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      textTransform="uppercase"
                    >
                      Fat
                    </Text>
                  </Box>

                  <Box>
                    <Text fontSize="md">
                      {Math.round(recipe.totalNutrients.CHOLE.quantity)} mg
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      textTransform="uppercase"
                    >
                      Cholesterol
                    </Text>
                  </Box>

                  <Box>
                    <Text fontSize="md">
                      {Math.round(recipe.totalNutrients.NA.quantity)} mg
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      textTransform="uppercase"
                    >
                      Sodium
                    </Text>
                  </Box>
                </SimpleGrid>
              </Box>
            </Stack>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};
