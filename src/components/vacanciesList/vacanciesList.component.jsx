import { Loader, Stack } from "@mantine/core";
import VacancyPreview from "../vacancyPreview/vacancyPreview.component";

import useStyles from "./vacanciesList.styles";

const VacanciesList = ({ vacancies, isLoading }) => {
  const { classes } = useStyles();

  return (
    <Stack spacing='lg' className={classes.listWrapper}>
      {
        isLoading
          ? <Loader className={classes.loader} />
          : vacancies.map(vacancy => <VacancyPreview key={vacancy.id} vacancy={vacancy} />)
      }
    </Stack>
  );
};

export default VacanciesList;