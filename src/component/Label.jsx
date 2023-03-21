import React, {useEffect, useState} from 'react';
import OutputLabel from "./OutputLabel";
import classes from "./Label.module.css";

const Label = (props) => {
    const [data, setData] = useState(); //данные по стикерам
    const [name, setName] = useState([]); //данные по названию
    const [nameFind, setNameFind] = useState(); //данные по названию

    const initData = async () => {
        const response = await fetch(
            'https://suppliers-api.wildberries.ru/api/v3/orders/stickers?type=png&width=58&height=40',
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NJRCI6IjY0MDU3NzQwLThkMzYtNGI0YS1iZjZhLTlkMmEzMDljM2Q4NyJ9.OMO-inzyzCUil3VcsP2SjrsiiaQSOjCR1ezgPgsB8vw',
                    'Content-Type': 'application/json',
                },
                // body: '{\n  "orders": [\n    5346346\n  ]\n}',
                body: JSON.stringify({
                    orders: [props.data.id],
                }),
            }
        )
            .then((response) => response.json())
            .then((info) => setData(info.stickers));
    };
    const nameData = async () => {
        const response = await fetch(
            'https://suppliers-api.wildberries.ru/content/v1/cards/filter',
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NJRCI6IjY0MDU3NzQwLThkMzYtNGI0YS1iZjZhLTlkMmEzMDljM2Q4NyJ9.OMO-inzyzCUil3VcsP2SjrsiiaQSOjCR1ezgPgsB8vw',
                    'Content-Type': 'application/json',
                },
                // body: '{\n  "orders": [\n    5346346\n  ]\n}',
                body: JSON.stringify({
                    vendorCodes: [props.data.article],
                }),
            }
        )
            .then((response) => response.json())
            .then((info) => setName(info.data[0].characteristics));
    };

    function startname() {
        name.map(itemTwo => {
            for (let x in itemTwo) {
                if (x === 'Наименование'){
                    setNameFind(itemTwo[x])
                }
            }
        })

    }

    useEffect(() => {
        const timer = setTimeout(() => {
            initData();
            nameData();
        }, props.ind+1000);
        return () => clearTimeout(timer);
    }, [props.data.id]);

    useEffect(() => {
        startname();
    }, [name]);


console.log(props.data)
    console.log(data)
    console.log(name)
    console.log(nameFind)
    return (
        <div className={classes.top}>
            {data
                ?   <div className={classes.container}>
                    <p className={classes.text}><span>{props.data.article} - {nameFind} - {data[0].partB}</span></p>
                        <img src={`data:image/jpeg;base64,${data[0].file}`} />
                    </div>
                : <span>Загружаем стикер</span>

            }
        </div>
    );
};

export default Label;