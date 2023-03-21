import './App.css';
import {useEffect, useState} from "react";
import Label from "./component/Label";

function App() {

  const [order, setOrder] = useState([]); //данные по поставке
  const [sortData, setSortData] = useState([]); //сортированные данные поставки
  const [seconds, setSeconds] = useState(0); // счетчик

  const initOrder = async () => {
    const response = await fetch(
        'https://suppliers-api.wildberries.ru/api/v3/supplies/WB-GI-42354428/orders',
        {
          headers: {
            Accept: 'application/json',
            Authorization:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NJRCI6IjY0MDU3NzQwLThkMzYtNGI0YS1iZjZhLTlkMmEzMDljM2Q4NyJ9.OMO-inzyzCUil3VcsP2SjrsiiaQSOjCR1ezgPgsB8vw',
          },
        }
    )
        .then((response) => response.json())
        .then((orders) => setOrder(orders.orders));
  };

  useEffect(() => {
    initOrder();
  }, []);

  useEffect(() => {
    setSortData(order.sort(byField('article')))
  }, [order.length >= 1]);

  function byField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
  }

  return (
    <div className="App">
      {sortData
                ?   sortData.map((item, index) => <Label key={item.id} data={item} ind={index}/>
          )

                : <span>Загружаем данные поставки</span>
      }

    </div>
  );
}

export default App;
