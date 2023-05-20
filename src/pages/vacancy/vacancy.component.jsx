import { Loader, Stack, TypographyStylesProvider } from "@mantine/core";
import { useParams } from "react-router-dom";
import VacancyPreview from "../../components/vacancyPreview/vacancyPreview.component";
import Card from "../../components/layout/card/card.component";

import useStyles from "./vacancy.styles";
import { useEffect, useState } from "react";
import { fetchVacancyById } from "../../axios/requests";

const Vacancy = () => {
  const { classes } = useStyles();
  const { id } = useParams();
  const [vacancy, setVacancy] = useState({});

  useEffect(() => {
    const fetchVacancy = async () => {
      const response = await fetchVacancyById(id);
      setVacancy(response);
    }

    fetchVacancy();
  }, []);

  return (
    <>
      {
        Object.keys(vacancy).length !== 0
          ? (
            <Stack spacing='xl' className={classes.wrapper}>
              <VacancyPreview
                vacancy={vacancy}
                isInFullVacancy={true}
              />
              <TypographyStylesProvider>
                <Card
                  dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }}
                  className={classes.description}
                />
              </TypographyStylesProvider>
            </Stack>
          )
          : <Loader className={classes.loader} />
      }
    </>
  );
};

export default Vacancy;