import {
  Box, Flex, Heading, Spinner, Stack, Image,
} from '@chakra-ui/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getDetails } from '../../hooks/useSpoonacular';
import { Ingredient } from '../../interfaces/Ingredient';

function Details() {
  const { id } = useParams();

  if (!id) {
    return <div>not found</div>;
  }

  const recipeID = +id;
  const { isLoadingRecipeDetails, recipeDetails } = getDetails(recipeID);

  return (

    <div>
      {isLoadingRecipeDetails
        ? <Spinner size="xl" />
        : !!recipeDetails
        && (
          <Flex key={recipeDetails.id} p={4} bg="white" boxShadow="md" borderRadius="md" margin="1em" marginTop="3em">
            <Box
              role="group"
              p={6}
              w="full"
              bg="gray.200"
              boxShadow="2xl"
              rounded="lg"
              pos="relative"
              zIndex={1}
            >
              <Box
                rounded="lg"
                mt={-12}
                pos="relative"
                height="230px"
                _after={{
                  transition: 'all .3s ease',
                  content: '""',
                  w: 'full',
                  h: 'full',
                  pos: 'absolute',
                  top: 5,
                  left: 0,
                  backgroundImage: `url(${recipeDetails.image})`,
                  filter: 'blur(15px)',
                  zIndex: -1,
                }}
                _groupHover={{
                  _after: {
                    filter: 'blur(20px)',
                  },
                }}
              >
                <Image
                  rounded="lg"
                  height="230px"
                  width="282px"
                  objectFit="cover"
                  src={recipeDetails.image}
                  margin="auto"
                />
              </Box>
              <Stack pt={10} align="center">
                <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
                  {recipeDetails.title}
                </Heading>
                <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
                  Ingredients
                </Heading>
                {recipeDetails.extendedIngredients.map((ingredient: Ingredient) => (
                  <p>{ingredient.original}</p>
                ))}
                <Heading fontSize="2xl" fontFamily="body" fontWeight={500}>
                  Instructions
                </Heading>
                <div dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }} />

              </Stack>
            </Box>
          </Flex>
        )}
    </div>

  );
}

export default Details;
