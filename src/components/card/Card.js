import React, {useState, useEffect} from "react";
import './card.scss'
import {BuyButton} from "../BuyButton/BuyButton";

export const Card = () => {
    const [error, setError] = useState(null)
    const [isloaded, setIsloaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e')
            .then(res => res.json())
            .then(
                (result) => {
                    setIsloaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsloaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isloaded) {
        return <div>Loading...</div>;
    } else {
        return (
                <div className='card'>
                    {items.map(item => (
                    <div className='container_card'>
                        <div className="wrapper_title">
                            <div key={item.id} className="title_name">{item.category}</div>
                            <div key={item.id} className="title_item">{item.name}</div>
                        </div>
                        <div className="wrapper_buy">
                            <div className="buy_dollar">$</div>
                            <div key={item.id} className="buy_price">{item.price}</div>
                            <div className="buy_btn"><BuyButton/></div>
                        </div>
                    </div>))}
                </div>
        );
    }
}