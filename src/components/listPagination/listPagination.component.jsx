import { useContext, useEffect, useState } from "react";
import { VacanciesContext } from "../../contexts/vacancies.context";
import { Pagination } from "@mantine/core";

import useStyles from "./listPagination.styles";

const ListPagination = ({ params, setParams, handleRequest }) => {
  const { pagesAmount } = useContext(VacanciesContext);
  const { classes } = useStyles();

  const handlePageChange = (value) => {
    const preparedParams = { ...params, currentPage: +value };
    handleRequest(preparedParams);
  }

  return (
    <Pagination
      onChange={handlePageChange}
      value={+params.currentPage}
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