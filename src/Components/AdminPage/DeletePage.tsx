import React from 'react';
import { getItems, deleteItemById, setItemOrderStatus } from '../../hooks/useSupabaseData';
import { glassesDataType } from '../../mockData';
export const DeletePage = () => {
    const [items, setItems] = React.useState<glassesDataType[] | undefined>()
    if (!items) {

        getItems().then(d => setItems(d))
    }

    const handleDelete = ((item: glassesDataType) => {
        deleteItemById(item.id).then(() => getItems().then(d => setItems(d)))

    })

    const handleOrderStatus = (id: string) => {
        setItemOrderStatus(id, false)
    }
    return (
        <div className="delete-wrapper">{items?.map(item => {
            return <div key={item.id} className="single-item"><div className="delete-item">
                <img className="delete-pic" src={item.urls[0]}></img>
                <p>{item.name}</p>
                <button className="delete-button" onClick={() => handleDelete(item)}>DELETE</button>
            </div>
                {item.ordered && <div>This item has been ordered <button onClick={() => handleOrderStatus(item.id)}>Reverse the order status</button></div>}
            </div>
        })}</div>
    );
};

