import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import classes from "./StartPage.module.css";
import Label from "../component/Label";

const StartPage = () => {
  const token =
    "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjQwNTA2djEiLCJ0eXAiOiJKV1QifQ.eyJlbnQiOjEsImV4cCI6MTczMjU3Mjc3MywiaWQiOiI1YWNmMTVmNC0zMGYzLTQ0NDEtYjAzOC04OTZlZWYxMjU2ZWYiLCJpaWQiOjg4ODM1NjQ2LCJvaWQiOjk0MzY1NSwicyI6NDgsInNpZCI6IjBiMGRiNDM5LTlkNzgtNDUxMC04ZTQxLTA0MzU3OWM4ODEzYSIsInQiOmZhbHNlLCJ1aWQiOjg4ODM1NjQ2fQ.EoAuYYSmbo6Hx44JJDN98hY97uGBzUEPtH75cZn_8C-liFF5J65YwPtYXWTRG_60_lMXtb4xR7Z0lNfIHs6wOg"; // Замените на ваш токен

  const tableData = useSelector((state) => state.tableData);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 90;
  const [sortData, setSortData] = useState([]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    // Группируем данные по артикулу
    const groupedData = tableData.reduce((acc, item) => {
      if (!acc[item.article]) {
        acc[item.article] = [];
      }
      acc[item.article].push(item);
      return acc;
    }, {});

    // Сортируем группы по количеству элементов в каждой группе
    const sortedGroups = Object.values(groupedData).sort(
      (a, b) => b.length - a.length,
    );

    // Объединяем отсортированные группы в единый массив
    const sortedData = sortedGroups.flat();

    setSortData(sortedData);
  }, [tableData]);

  const getPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortData.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(sortData.length / itemsPerPage);

  return (
    <div>
      <div className={classes.pagin}>
        <button
          className={classes.btn}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          prev
        </button>
        <span>
          Страница {currentPage} / {totalPages}
        </span>
        <button
          className={classes.btn}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          next
        </button>
      </div>

      <div ref={componentRef}>
        {sortData.length > 0 ? (
          getPageItems().map((item, index) => (
            <Label
              token={token}
              key={item.id}
              data={item}
              ind={index}
              currentPage={currentPage}
            />
          ))
        ) : (
          <div className={classes.container}>
            <span className={classes.loader}></span>{" "}
            <div className={classes.err}>Загружаем данные</div>
          </div>
        )}
      </div>
      <button className={classes.print} onClick={handlePrint}>
        Print this page!
      </button>
    </div>
  );
};

export default StartPage;
