import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
import { Button } from 'react-bootstrap';
import { FaEdit, FaPlusSquare } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const flowEvents = [
  {
    id: uuidv4(),
    name: 'Enviar mensagem whatsapp',
  },
  {
    id: uuidv4(),
    name: 'Enviar e-mail',
  },
  {
    id: uuidv4(),
    name: 'Cadastrar em um evento',
  },
  {
    id: uuidv4(),
    name: 'Enviar informações próximo culto',
  }
]

function App() {
  const [steps, updateSteps] = useState(flowEvents);
  
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    
    const items = Array.from(steps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    updateSteps(items);
    
    console.log('steps: ',items);
  }
  
  function executeFlow() {
    console.log(steps);
  }

  function saveFlow() {
    console.log('save flow');
  }

  function addEvent() {
    const items = Array.from(steps);

    items.push({
      id: uuidv4(),
      name: 'Item adicionado'
    })
    
    updateSteps(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Drag and drop - POC</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {steps.map(({id, name}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <div className='stepFlow'>
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <p>
                              { name }
                            </p>
                          </li>
                          <FaEdit/>
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

      <FaPlusSquare className='addEvent' onClick={addEvent}/>

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
