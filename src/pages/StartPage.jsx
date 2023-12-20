import React, { useEffect, useState, useRef } from "react";
import Label from "../component/Label";
import { useParams } from "react-router-dom";
import LoaderBig from "../component/Loader/LoaderBig";
import classes from "./StartPage.module.css";
import { useReactToPrint } from 'react-to-print';

function StartPage() {
  const { WB } = useParams();
  const { token } = useParams();

  const [order, setOrder] = useState([]); // данные по поставке
  const [currentPage, setCurrentPage] = useState(1); // текущая страница
  const itemsPerPage = 100; // количество элементов на странице



  const [sortData, setSortData] = useState([]); // сортированные данные поставки для пагинации
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const initOrder = async () => {
    const response = await fetch(
      `https://suppliers-api.wildberries.ru/api/v3/supplies/${WB}/orders`,
      {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      }
    );
    const orders = await response.json();
    setOrder(orders.orders);
  };

  useEffect(() => {
    initOrder();
  }, []); // Загрузка данных по поставкам при монтировании

  useEffect(() => {
    setSortData(order.sort(byField("article")));
  }, [order]); // Обновление отсортированных данных при изменении данных по поставкам

  function byField(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }

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

  return (
    <div >
{/* Пагинация */}
<div className={classes.pagin}>
        <button className={classes.btn} onClick={handlePrevPage} disabled={currentPage === 1}>
          prev
        </button>
        <span>Страница {currentPage}</span>
        <button className={classes.btn}
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= sortData.length}
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
      <button className={classes.print} onClick={handlePrint}>Print this page!</button>

      
    </div>
  );
}

export default StartPage;
