import React, {useState} from "react";
import './buyButton.scss'
import {Modal} from "../modal/Modal";

export const BuyButton = () => {
    const [modalActive, setModalActive] = useState(false)

    return (
        <>
        <button
            onClick={() => setModalActive(true)}
            className="btn_buy">
            BUY
        </button>
        <Modal
            active={modalActive}
            setActive={setModalActive}/>
        </>
)
}