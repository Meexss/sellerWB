import React, {useState} from 'react';
import {Link} from "react-router-dom";
import classes from "./FirstPage.module.css";
import Label from "../component/Label";

const FirstPage = () => {
    const [text, setText] = useState('')
    const [error, setError] = useState(false)

    return (
        <div className={classes.userBox}>
            <span className={classes.text}>Вставьте номер поставки</span>
            <input
                type='text'
                placeholder='WB-GI-..'
                className={error ? classes.err :  classes.styleInput}
                value={text}
                onChange={(e) => {
                    setError(false)
                    setText(e.target.value)}}

            />
            <div>
                {text.length > 13 ? <Link className={classes.button}
                        // className={classes.linkSee}
                              to={`/data/${text}`}>Получить стикеры</Link>
                : <span onClick={e => setError(true)}  className={classes.button}>Получить стикеры</span>
                }


            </div>

        </div>
    );
};

export default FirstPage;