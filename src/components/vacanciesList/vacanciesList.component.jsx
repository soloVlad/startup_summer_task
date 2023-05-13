import { Stack } from "@mantine/core";
import useStyles from "./vacanciesList.styles";
import VacancyPreview from "../vacancyPreview/vacancyPreview.component";

const VacanciesList = ({ vacancies }) => {
  const { classes } = useStyles;

  return (
    <Stack spacing='lg'>
      {
        vacancies.map(vacancy => <VacancyPreview key={vacancy.id} vacancy={vacancy} />)
      }
    </Stack>
  );
};

export default VacanciesList;