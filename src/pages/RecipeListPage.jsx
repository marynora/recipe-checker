import { useState } from "react";
import {
  Box,
  Heading,
  Input,
  SimpleGrid,
  Image,
  Text,
  Stack,
  Badge,
  Card,
} from "@chakra-ui/react";
import { data } from "../utils/data";
import { ColorModeButton } from "../components/ui/color-mode";


export const RecipeListPage = ({ selectRecipe }) => {
  const [searchField, setSearchField] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const recipes = data.hits;

  const filteredRecipes = recipes.filter((item) => {
    const recipe = item.recipe;
    const searchText = searchField.toLowerCase();


    const labelMatch = recipe.label.toLowerCase().includes(searchText);

    const healthLabelMatch = recipe.healthLabels.some((healthLabel) =>
      healthLabel.toLowerCase().includes(searchText),
    );

  const filterMatch =
  selectedFilter === "all" ||
  recipe.healthLabels
    .map((label) => label.toLowerCase())
    .includes(selectedFilter);

return (labelMatch || healthLabelMatch) && filterMatch;
  });

  return (
    <Box
      minH="100vh"
      px={{ base: 4, md: 8 }}
      py={{ base: 4, md: 6 }}
      bg={{ base: "orange.200", _dark: "gray.900" }}
    >
      <Box maxW="1400px" mx="auto">
        <Stack direction="row" justify="flex-end" mb={2}>
          <ColorModeButton />
        </Stack>

        <Stack direction="column" align="center" gap={6} mb={10}>
          <Heading
            textAlign="center"
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="bold"
            color="white"
          >
            Recipe Checker
          </Heading>

          <Input
            placeholder="Search recipes"
            value={searchField}
            onChange={(event) => setSearchField(event.target.value)}
            maxW="560px"
            width="100%"
            bg="gray.50"
            color="gray.700"
            size="lg"
            borderRadius="md"
          />
        </Stack>

        <Stack
          direction="row"
          gap={2}
          flexWrap="wrap"
          justify="center"
          mt={-2}
          mb={10}
        >
          <Badge
            cursor="pointer"
            bg={
              selectedFilter === "all"
                ? { base: "purple.300", _dark: "purple.500" }
                : { base: "gray.200", _dark: "gray.600" }
            }
            color={{ base: "gray.800", _dark: "white" }}
            onClick={() => setSelectedFilter("all")} 
          >
            All
          </Badge>

          <Badge
            cursor="pointer"
            bg={
              selectedFilter === "vegan"
                ? { base: "purple.300", _dark: "purple.500" }
                : { base: "gray.200", _dark: "gray.600" }
            }
            color={{ base: "gray.800", _dark: "white" }}
            onClick={() => setSelectedFilter("vegan")}
          >
            Vegan
          </Badge>

          <Badge
            cursor="pointer"
            bg={
              selectedFilter === "vegetarian"
                ? { base: "purple.300", _dark: "purple.500" }
                : { base: "gray.200", _dark: "gray.600" }
            }
            color={{ base: "gray.800", _dark: "white" }}
            onClick={() => setSelectedFilter("vegetarian")}
          >
            Vegetarian
          </Badge>

          <Badge
            cursor="pointer"
            bg={
              selectedFilter === "pescatarian"
                ? { base: "purple.300", _dark: "purple.500" }
                : { base: "gray.200", _dark: "gray.600" }
            }
            color={{ base: "gray.800", _dark: "white" }}
            onClick={() => setSelectedFilter("pescatarian")}
          >
            Pescatarian
          </Badge>
        </Stack>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={8}>
          {filteredRecipes.map((item) => {
            const recipe = item.recipe;

            return (
              <Card.Root
                key={recipe.label}
                borderRadius="xl"
                overflow="hidden"
                cursor="pointer"
                onClick={() => selectRecipe(recipe)}
                _hover={{
                  transform: "translateY(-10px)",
                  boxShadow: "xl",
                }}
              >
                <Image
                  src={recipe.image}
                  alt={recipe.label}
                  h="240px"
                  w="100%"
                  objectFit="cover"
                />

                <Card.Body>
                  <Stack
                    direction="column"
                    gap={3}
                    align="stretch"
                    textAlign="center"
                  >
                    <Text
                      fontSize="sm"
                      color={{ base: "gray.600", _dark: "gray.300" }}
                      textTransform="uppercase"
                      fontWeight="medium"
                    >
                      {recipe.mealType[0]}
                    </Text>

                    <Heading
                      fontSize={{ base: "1xl", md: "2xl" }}
                      fontWeight="medium"
                      lineHeight="1.2"
                    >
                      {recipe.label}
                    </Heading>

                    <Stack
                      direction="row"
                      justify="center"
                      flexWrap="wrap"
                      textTransform="uppercase"
                    >
                      {recipe.healthLabels.includes("Vegan") && (
                        <Badge
                          colorPalette="purple"
                          fontWeight="bold"
                        >
                          Vegan
                        </Badge>
                      )}
                      {recipe.healthLabels.includes("Vegetarian") && (
                        <Badge
                        colorPalette="purple"
                          fontWeight="bold"
                        >
                          Vegetarian
                        </Badge>
                      )}
                      {recipe.healthLabels.includes("Pescatarian") && (
                        <Badge
                         colorPalette="purple"
                          fontWeight="bold"
                        >
                          Pescatarian
                        </Badge>
                      )}
                    </Stack>

                    <Stack
                      direction="row"
                      justify="center"
                      flexWrap="wrap"
                      textTransform="uppercase"
                    >
                      {recipe.dietLabels.map((dietLabel) => (
                        <Badge
                          key={dietLabel}
                          colorPalette="green"
                          fontWeight="bold"
                        >
                          {dietLabel}
                        </Badge>
                      ))}
                    </Stack>

                    <Text fontSize="md">
                      <Text as="span" fontWeight="bold">
                        Dish:{" "}
                      </Text>
                      {recipe.dishType[0]}
                    </Text>

                    {recipe.cautions.length > 0 && (
                      <Box>
                        <Text fontWeight="bold" mb={1} fontSize="md">
                          Cautions:
                        </Text>
                        <Stack
                          direction="row"
                          justify="center"
                          flexWrap="wrap"
                          textTransform="uppercase"
                        >
                          {recipe.cautions.map((caution) => (
                            <Badge
                              key={caution}
                              colorPalette="red"
                              fontWeight="bold"
                            >
                              {caution}
                            </Badge>
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Stack>
                </Card.Body>
              </Card.Root>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};