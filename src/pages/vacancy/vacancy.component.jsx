import { Stack, TypographyStylesProvider } from "@mantine/core";
import VacancyPreview from "../../components/vacancyPreview/vacancyPreview.component";
import useStyles from "./vacancy.styles";
import Card from "../../components/layout/card/card.component";

const vacancy = {
  id: 1,
  profession: 'Менеджер-дизайнер',
  firm_name: 'Пятёрочка',
  town: {
    title: 'Новый Уренгой',
  },
  type_of_work: {
    title: 'Полный рабочий день',
  },
  payment_from: 70000,
  payment_to: 0,
  currency: 'rub',
  agreement: 'false',
  vacancyRichText: "<b>Обязанности:<\/b><br \/><br \/>1. Администрирование баз данных<br \/>2. Доработка нетиповой конфигурации на платформе 1С 8.2<br \/>3. Поддержка пользователей сети<br \/>4. Написание инструкций для пользователей 1С по функционалу конфигураций и доработок, обучение пользователей<br \/><br \/><b>Требования:<\/b><br \/><br \/>Опыт разработки на платформе 1С (версия 8). <br \/>Понимание специфики бизнес-процессов торговых предприятий.<br \/><br \/><b>Условия:<\/b><br \/><br \/>Трудоустройство согласно ТК РФ, соцпакет. <br \/>Место работы - ТЦ &quot;Стройка&quot;. Доставка служебным транспортом. <br \/>Заработная плата обсуждается с успешным кандидатом."
};

const Vacancy = () => {
  const { classes } = useStyles();

  return (
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
  );
};

export default Vacancy;