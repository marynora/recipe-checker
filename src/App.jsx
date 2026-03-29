import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { RecipeListPage } from './pages/RecipeListPage';
import { RecipePage } from './pages/RecipePage';


export const App = () => {
    const [selectedRecipe, setSelectedRecipe] = useState();
    // Your state code here
return (
  <Box minH="100vh">
    {selectedRecipe 
    ? <RecipePage recipe={selectedRecipe} selectRecipe={setSelectedRecipe} />
    : <RecipeListPage selectRecipe={setSelectedRecipe} />
}
  </Box>
);
};