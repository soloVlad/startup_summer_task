import { Center, Flex, Stack, Text, Title } from "@mantine/core";
import Card from "../layout/card/card.component";

import { ReactComponent as GeoIcon } from '../../assets/icons/geo.svg';
import { ReactComponent as DotIcon } from '../../assets/icons/dot.svg';

import useStyles from "./vacancyPreview.styles";

const VacancyPreview = ({ vacancy }) => {
  const { classes } = useStyles();

  return (
    <Card>
      <Stack>
        <Flex gap='lg' className={classes.titleWrapper}>
          <Title order={2} className={classes.profession}>{vacancy.profession}</Title>
          <Center className={classes.starIconWrapper}>
            <span>Star</span>
          </Center>
        </Flex>
        <Flex gap='lg' className={classes.infoWrapper}>
          <Title order={3}>
            {`${vacancy.payment_from} - ${vacancy.payment_to} ${vacancy.currency}`}
          </Title>
          <Center className={classes.dotIconWrapper}>
            <DotIcon className={classes.dotIcon} />
          </Center>
          <Text className={classes.typeOfWork}>{vacancy.type_of_work.title}</Text>
        </Flex>
        <Flex gap='md' className={classes.geoWrapper}>
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