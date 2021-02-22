import React, {useState} from "react";
import {Card} from "./components/card/Card";
import {Modal} from "./components/modal/Modal";
import './index.scss';


function App() {
    const [modalActive, setModalActive] = useState(false)
  return (
    <div className="container">
        <Card/>
        <button
            className="btn_cheapest"
            onClick={() => setModalActive(true)}>
            Buy cheapest
        </button>
        <Modal active={modalActive} setActive={setModalActive}/>
    </div>
  );
}

export default App;
