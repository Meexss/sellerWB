import React, {useEffect, useState} from 'react';

const OutputLabel = (props) => {
    const [find, setFind] = useState()
    const [findName, setFindName] = useState()

    function test() {
        let abc = props.data.find(item => item.orderId == props.item.id)
        props.name.map(item => {
            if(item.vendorCode == props.item.article) {
                item.characteristics.map(itemTwo => {
                    for (let x in itemTwo) {
                        if (x === 'Наименование'){
                            setFindName(itemTwo[x])
                        }
                    }
                })
            }
        })
        setFind(abc)
    }

    useEffect(() => {
        test()
    }, [props.data >= 1])
    return (
        <div>
            {find   ? <div>
                <p>{props.item.article} - {findName} - {find.partB}</p>
                <img src={`data:image/jpeg;base64,${find.file}`} />
            </div>
            : <p>Грузим этикетки</p>
            }

        </div>
    );
};

export default OutputLabel;