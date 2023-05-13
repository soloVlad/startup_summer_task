import VacancyPreview from "../../components/vacancyPreview/vacancyPreview.component";

const vacancies = [
  {
    id: 1,
    profession: 'Junior JS developer',
    firm_name: 'Pyatorochka',
    town: {
      title: 'Minks',
    },
    type_of_work: {
      title: 'fulltime job',
    },
    payment_from: 0,
    payment_to: 2000,
    currency: 'rub',
    agreement: 'false',
  },
  {
    id: 2,
    profession: 'Junior JS developer',
    firm_name: 'Pyatorochka',
    town: {
      title: 'Minks',
    },
    type_of_work: {
      title: 'fulltime job',
    },
    payment_from: 0,
    payment_to: 0,
    currency: 'rub',
    agreement: 'true',
  },
  {
    id: 3,
    profession: 'Junior JS developer',
    firm_name: 'Pyatorochka',
    town: {
      title: 'Minks',
    },
    type_of_work: {
      title: 'fulltime job',
    },
    payment_from: 15000,
    payment_to: 20000,
    currency: 'rub',
    agreement: 'true',
  }
];

const Home = () => {
  return (
    <>
      {
        vacancies.map((vacancy, id) => (
          <VacancyPreview key={id} vacancy={vacancy} />
        ))
      }
    </>
  );
};

export default Home;