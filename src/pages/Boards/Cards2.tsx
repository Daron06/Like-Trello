import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export const Cards2: React.FC<{ type: any; subItems: any }> = ({ type, subItems }) => {
  return (
    <Droppable droppableId={type} type={`droppableSubItem`}>
      {(provided: any) => (
        <div ref={provided.innerRef}>
          {subItems.map((item: any, index: number) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided: any) => (
                <div style={{ display: 'flex' }}>
                  <div ref={provided.innerRef} {...provided.draggableProps}>
                    {item.content}
                    <span
                      {...provided.dragHandleProps}
                      style={{
                        display: 'block',
                        margin: '0 10px',
                        border: '1px solid #000',
                      }}
                    >
                      Drag
                    </span>
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
