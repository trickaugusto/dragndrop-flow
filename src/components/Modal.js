import { useState } from 'react';
import { Button } from 'react-bootstrap';

export default function Modal({ item, closeModal, saveInfos }) {
    const [valueName, setValueName] = useState('');
    const [consoleValue, setConsoleValue] = useState('');

    const handleChangeName = (event) => {
        setValueName(event.target.value);
    }

    const handleChangeConsole = (event) => {
        setConsoleValue(event.target.value);
    }

    return (
        <div className="modal overlay">
            <div className="modal-content">
                <div className="modal-body">
                    <h4>Nome da ação:</h4>
                    <input 
                        defaultValue={item.name}
                        onChange={handleChangeName}
                    ></input>

                    <h4>Qual evento (console) deverá acontecer?</h4>
                    <input 
                        defaultValue={item.consoleValue}
                        placeholder='Escreva o console desejado'
                        onChange={handleChangeConsole}
                    ></input>
                </div>

                <div className="modal-footer">
                    <Button onClick={closeModal}>Close</Button>
                    <Button onClick={() => { saveInfos(item.id, valueName ? valueName : item.name, consoleValue ? consoleValue : item.consoleValue) }}>Save changes</Button>
                </div>
            </div>
        </div>
    )
}