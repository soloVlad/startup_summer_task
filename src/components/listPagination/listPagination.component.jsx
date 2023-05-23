import { useContext } from "react";
import { VacanciesContext } from "../../contexts/vacancies.context";
import { Pagination } from "@mantine/core";

import useStyles from "./listPagination.styles";

const ListPagination = () => {
  const { pagesAmount, currentPage, updateCurrentPage } = useContext(VacanciesContext);
  const { classes } = useStyles();

  const handlePageChange = (value) => {
    updateCurrentPage(value - 1);
  }

  return (
    <Pagination
      onChange={handlePageChange}
      value={currentPage + 1}
      total={pagesAmount}
      sx={(theme) => ({
        gap: theme.spacing.sm,

        [theme.fn.smallerThan('xs')]: {
          gap: 0,
        }
      })}
      classNames={{
        control: classes.paginationControl,
      }}
      className={classes.pagination}
    />
  );
};

export default ListPagination;