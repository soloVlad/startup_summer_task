import { Center, Flex, Stack, Text, Title } from "@mantine/core";
import Card from "../layout/card/card.component";
import StarButton from "../starButton/starButton.component";
import { useNavigate } from "react-router-dom";

import { ReactComponent as GeoIcon } from '../../assets/icons/geo.svg';
import { ReactComponent as DotIcon } from '../../assets/icons/dot.svg';

import useStyles from "./vacancyPreview.styles";
import ROUTES from "../../constants/routes";

const VacancyPreview = ({ vacancy, isInFullVacancy }) => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  const handleCardClick = () => {
    navigate(`${ROUTES.VACANCY}/${vacancy.id}`);
  };

  return (
    <Card onClick={handleCardClick} className={!isInFullVacancy && classes.cardLink}>
      <Stack spacing='lg'>
        <Flex gap='md' className={classes.titleWrapper}>
          <Title order={2} className={classes.profession}>{vacancy.profession}</Title>
          <StarButton vacancyId={vacancy.id} />
        </Flex>
        <Flex gap='md' className={classes.infoWrapper}>
          <Title order={3}>
            {`${vacancy.payment_from} - ${vacancy.payment_to} ${vacancy.currency}`}
          </Title>
          <Center className={classes.dotIconWrapper}>
            <DotIcon className={classes.dotIcon} />
          </Center>
          <Text className={classes.typeOfWork}>{vacancy.type_of_work.title}</Text>
        </Flex>
        <Flex gap='sm' className={classes.geoWrapper}>
          <Center className={classes.geoIconWrapper}>
            <GeoIcon className={classes.geoIcon} />
          </Center>
          <Title order={4}>{vacancy.town.title}</Title>
        </Flex>
      </Stack>
    </Card>
  );
};

export default VacancyPreview;