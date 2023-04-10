import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./FirstPage.module.css";
import Label from "../component/Label";

const FirstPage = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const dataSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const tokenOne =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NJRCI6IjY0MDU3NzQwLThkMzYtNGI0YS1iZjZhLTlkMmEzMDljM2Q4NyJ9.OMO-inzyzCUil3VcsP2SjrsiiaQSOjCR1ezgPgsB8vw";
  const tokenTwo =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NJRCI6IjdmMTNhMjRhLWViODEtNDlkZi1hYjA0LWE1OTg5ZGEzMjIwMiJ9.ERYzAZJjgfPJ2_G5NshTUpTezS0c3bC3XZQ0idQUdTw";

  console.log(selectedOption);
  return (
    <div className={classes.userBox}>
      <div className={classes.dropdown}>
        <span className={classes.text}>Выберите токен доступа</span>
        <select className={classes.option}  name="color" value={selectedOption} onChange={dataSelect}>
          <option value="" hidden disabled selected>
            Выбрать
          </option>
          <option value={tokenOne}>TokenOne</option>
          <option value={tokenTwo}>TokenTwo</option>
        </select>
      </div>
      <span className={classes.text}>Вставьте номер поставки</span>
      <input
        type="text"
        placeholder="WB-GI-.."
        className={error ? classes.err : classes.styleInput}
        value={text}
        onChange={(e) => {
          setError(false);
          setText(e.target.value);
        }}
      />
      <div>
        {text.length > 13 ? (
          <Link
            className={classes.button}
            // className={classes.linkSee}
            to={`/data/${text}/${selectedOption}`}
          >
            Получить стикеры
          </Link>
        ) : (
          <span onClick={(e) => setError(true)} className={classes.button}>
            Получить стикеры
          </span>
        )}
      </div>
    </div>
  );
};

export default FirstPage;
