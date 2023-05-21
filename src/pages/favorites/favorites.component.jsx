import { useContext, useEffect, useState } from "react";
import { Center, rem } from "@mantine/core";
import EmptyState from "../../components/emptyState/emptyState.component";
import { VacanciesContext } from "../../contexts/vacancies.context";
import VacanciesList from "../../components/vacanciesList/vacanciesList.component";
import { fetchFavorites } from "../../axios/requests";

const Favorites = () => {
  const { favoritesIds } = useContext(VacanciesContext);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      if (favoritesIds.length) {
        setIsLoading(true);
        const { objects } = await fetchFavorites(favoritesIds)
        setFavorites(objects);
        setIsLoading(false);
      };
    };

    loadFavorites();
  }, [favoritesIds]);

  return (
    <Center>
      {
        favoritesIds.length
          ? <VacanciesList vacancies={favorites} isLoading={isLoading} />
          : <EmptyState mt={rem(120)} />
      }
    </Center>
  );
};

export default Favorites;