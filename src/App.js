import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
import { Button } from 'react-bootstrap';
import { FaEdit, FaPlusSquare, FaTrashAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import Modal from './components/Modal';
import {saveLocalStorage, getStateFromLocalStorage } from './helpers/localStorageHandler';
import { flowExecHandler } from './helpers/flowExecHandler';

const localStorageData = getStateFromLocalStorage();

const flowEvents = localStorageData ? localStorageData : [
  {
    id: uuidv4(),
    consoleValue: 'Olá',
    name: 'Enviar mensagem whatsapp',
  },
  {
    id: uuidv4(),
    consoleValue: 'Olá',
    name: 'Enviar e-mail',
  },
  {
    id: uuidv4(),
    consoleValue: 'Olá',
    name: 'Cadastrar em um evento',
  },
  {
    id: uuidv4(),
    consoleValue: 'Olá',
    name: 'Enviar informações próximo culto',
  }
]

function App() {
  const [steps, updateSteps] = useState(flowEvents);
  const [isDragging, setIsDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const closeModal = () => {
    setShowModal(false);
  }

  const handleEditClick = (id, name, consoleValue) => {
    const item = {
      id, name, consoleValue
    }

    setSelectedItem(item);
    setShowModal(true);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateSteps(items);
    setIsDragging(false);
  }

  function handleOnDragStart() {
    setIsDragging(true)
  }

  function executeFlow() {
    flowExecHandler();
  }

  function saveInfos(id, valueName, consoleValue) {
    updateSteps((steps) => {
      return steps.map((item) => {
        if (item.id === id) {
          setShowModal(false);

          return { ...item, name: valueName, consoleValue: consoleValue };
        } else {
          return item;
        }
      });
    });
  }

  function saveFlow() {
    saveLocalStorage(steps)
  }

  function removeEventStep(id) {
    let items = Array.from(steps);

    items = items.filter((item) => {
      return item.id !== id
    })

    updateSteps(items);
  }

  function addEvent() {
    const items = Array.from(steps);

    items.push({
      id: uuidv4(),
      name: 'Novo item',
      consoleValue: 'Novo console'
    })

    updateSteps(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Drag and drop - POC</h1>
        <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {steps.map(({ id, name, consoleValue }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div className='stepFlow'>
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <p>
                              {name}
                            </p>
                          </li>

                          <div className='buttonsIcons'>
                            {!isDragging && (
                              <FaEdit onClick={() => handleEditClick(id, name, consoleValue)} />
                            )}

                            {!isDragging && (
                              <FaTrashAlt onClick={() => removeEventStep(id)} />
                            )}
                          </div>

                          {selectedItem?.id === id && showModal && (
                            <Modal item={selectedItem} closeModal={closeModal} saveInfos={saveInfos} />
                          )}

                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>

      <FaPlusSquare className='addEvent' onClick={addEvent} />

      <div className="buttons">
        <Button
          onClick={saveFlow}
          title="Salvar workflow"
        >
          Salvar workflow
        </Button>
        <Button
          onClick={executeFlow}
          title="Executar workflow"
        >
          Executar Workflow
        </Button>
      </div>
    </div>
  );
}

export default App;
