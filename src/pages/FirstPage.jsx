import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./FirstPage.module.css";
import Label from "../component/Label";

const FirstPage = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);


  const tokenOne =
    "eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjMxMDI1djEiLCJ0eXAiOiJKV1QifQ.eyJlbnQiOjEsImV4cCI6MTcxODM5MDkzNiwiaWQiOiI1ZTU4MjI1MC1hYzczLTRmNTMtOTc1ZS1jNjU4NjU1ZGQ3YWEiLCJpaWQiOjg4ODM1NjQ2LCJvaWQiOjk0MzY1NSwicyI6NDgsInNhbmRib3giOmZhbHNlLCJzaWQiOiIwYjBkYjQzOS05ZDc4LTQ1MTAtOGU0MS0wNDM1NzljODgxM2EiLCJ1aWQiOjg4ODM1NjQ2fQ.0QQG1Iiqwr3uTsdgkMz7UYdl_OTEc3A9tQJAJ634suzHf6Go6HMJdnWk2iL09r3U_54rAeXQdDoc-FmDzjo6AA";
  
  return (
    <div className={classes.userBox}>
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
            to={`/data/${text}/${tokenOne}`}
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
