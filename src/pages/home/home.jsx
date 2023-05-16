import { Flex, rem } from "@mantine/core";
import Filters from "../../components/filters/filters.component";
import VacanciesList from "../../components/vacanciesList/vacanciesList.component";

const vacancies = [
  {
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
  },
  {
    id: 2,
    profession: 'Ведущий графический дизайнер НЕ УДАЛЕННО',
    firm_name: 'Пятёрочка',
    town: {
      title: 'Москва',
    },
    type_of_work: {
      title: 'Полный рабочий день',
    },
    payment_from: 80000,
    payment_to: 0,
    currency: 'rub',
    agreement: 'false',
  },
  {
    id: 3,
    profession: 'Работник декорации, дизайнер (ТЦ Амбар)',
    firm_name: 'Пятёрочка',
    town: {
      title: 'Самара',
    },
    type_of_work: {
      title: 'Сменный график работы',
    },
    payment_from: 29000,
    payment_to: 29000,
    currency: 'rub',
    agreement: 'false',
  },
  {
    id: 4,
    profession: 'Менеджер-дизайнер',
    firm_name: 'Pyatorochka',
    town: {
      title: 'Тюмень',
    },
    type_of_work: {
      title: 'Полный рабочий день',
    },
    payment_from: 55000,
    payment_to: 95000,
    currency: 'rub',
    agreement: 'false',
  }
];

const Home = () => {
  return (
    <Flex gap={rem(28)} align='start'>
      <Filters />
      <VacanciesList vacancies={vacancies} withSearch={true} />
    </Flex>
  );
};

export default Home;