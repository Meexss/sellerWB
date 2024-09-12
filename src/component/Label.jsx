import React, { useEffect, useState } from "react";

import classes from "./Label.module.css";

const Label = (props) => {
  const [data, setData] = useState(); //данные по стикерам
  // const [name, setName] = useState([]); //данные по названию
  // const [nameFind, setNameFind] = useState(); //данные по названию
  console.log(props.data.id);
  console.log(props.token);
  console.log(props.data.article);
  console.log(data);

  const initData = async () => {
    const response = await fetch(
      "https://suppliers-api.wildberries.ru/api/v3/orders/stickers?type=png&width=58&height=40",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: props.token,
          "Content-Type": "application/json",
        },
        // body: '{\n  "orders": [\n    5346346\n  ]\n}',
        body: JSON.stringify({
          orders: [Number(props.data.id)],
        }),
      },
    )
      .then((response) => response.json())
      .then((info) => setData(info.stickers));
  };
  // const nameData = async () => {
  //   const response = await fetch(
  //     "https://suppliers-api.wildberries.ru/content/v1/cards/filter",
  //     {
  //       method: "POST",
  //       headers: {
  //         accept: "application/json",
  //         Authorization:
  //           "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjMxMDI1djEiLCJ0eXAiOiJKV1QifQ.eyJlbnQiOjEsImV4cCI6MTcxODM5MDk5MywiaWQiOiJjNjNlNWE1OS1lYWQ4LTQwMTYtOTY5Yi03OGJiM2JiNmZlZDUiLCJpaWQiOjg4ODM1NjQ2LCJvaWQiOjk0MzY1NSwicyI6MTAsInNhbmRib3giOmZhbHNlLCJzaWQiOiIwYjBkYjQzOS05ZDc4LTQ1MTAtOGU0MS0wNDM1NzljODgxM2EiLCJ1aWQiOjg4ODM1NjQ2fQ.TQgkwnsy6aWv_6Mei9MUl94ZC7HLn7JWVGo-o8W8STIXWgNQUi_B5JHkkZbcPLM2mwu1zq23scqDLoAztYUMwA",
  //         "Content-Type": "application/json",
  //       },
  //       // body: '{\n  "orders": [\n    5346346\n  ]\n}',
  //       body: JSON.stringify({
  //         vendorCodes: [props.data.article],
  //       }),
  //     },
  //   )
  //     .then((response) => response.json())
  //     .then((info) => setName(info.data[0].characteristics));
  // };

  // function startname() {
  //   name.map((itemTwo) => {
  //     for (let x in itemTwo) {
  //       if (x === "Наименование") {
  //         setNameFind(itemTwo[x]);
  //       }
  //     }
  //   });
  // }

  useEffect(() => {
    const timer = setTimeout(() => {
      initData();
      // nameData();
    }, props.ind + 10000);
    return () => clearTimeout(timer);
  }, [props.data.id]);

  // useEffect(() => {
  //   startname();
  // }, [name]);

  return (
    <div className={classes.top}>
      {data ? (
        <div className={classes.container}>
          <p className={classes.text}>
            <p className={classes.wrapper}>
              <span className={classes.textSpanSuper}>
                {props.data.article} -{" "}
              </span>
              <span className={classes.textSpan}>{props.data.name} - </span>
              <span className={classes.textSpanSuper}>{data[0].partB}</span>
            </p>
          </p>
          <img
            className={classes.img}
            src={`data:image/jpeg;base64,${data[0].file}`}
          />
        </div>
      ) : (
        <div className={classes.container}>
          <span className={classes.loader}></span>{" "}
          <div className={classes.textLoader}>Загружаем этикетки</div>
        </div>
      )}
    </div>
  );
};

export default Label;
