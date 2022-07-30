import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Boards.module.scss';
import { BoardСolumn } from '../../components/Pages/Board/BoardСolumn';
import { BoardButton } from '../../components/Pages/Board/BoardButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const reorder = (list: any, startIndex: any, endIndex: any): any => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// export const Boards: React.FC = () => {
//   const [state, setState] = React.useState({
//     quotes: [
//       {
//         title: 'Некий тайтл',
//         id: 'id-1/column/d&d',
//         cards: [
//           { title: 'Элемент 1', id: 'id-1/card/d&d' },
//           { title: 'Элемент 2', id: 'id-2/card/d&d' },
//           { title: 'Элемент 3', id: 'id-3/card/d&d' },
//         ],
//       },
//       {
//         title: 'Некий тайтл 2',
//         id: 'id-2/column/d&d',
//         cards: [
//           { title: 'Элемент 11', id: 'id-11/card/d&d' },
//           { title: 'Элемент 22', id: 'id-22/card/d&d' },
//           { title: 'Элемент 33', id: 'id-33/card/d&d' },
//           { title: 'Элемент 44', id: 'id-44/card/d&d' },
//         ],
//       },
//     ],
//   });

//   function onDragEnd(result: any) {
//     console.log(result);
//     if (!result.destination) {
//       return;
//     }

//     if (result.destination.index === result.source.index) {
//       return;
//     }

//     const quotes = reorder(state.quotes, result.source.index, result.destination.index);

//     setState({ quotes });
//   }

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="list">
//         {(provided: any) => (
//           <div className={styles.root} ref={provided.innerRef} {...provided.droppableProps}>
//             {state.quotes.map((column, index) => (
//               <BoardСolumn key={column.id} {...column} index={index} cards={column.cards} />
//             ))}
//             {provided.placeholder}
//             <BoardButton imgType="board-plus" text="Добавьте ещё одну колонку" />
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

import { nanoid } from 'nanoid';

const itemsFromBackend = [
  { id: nanoid(), content: 'First task' },
  { id: nanoid(), content: 'Second task' },
  { id: nanoid(), content: 'Third task' },
  { id: nanoid(), content: 'Fourth task' },
  { id: nanoid(), content: 'Fifth task' },
];

const columnsFromBackend2 = [
  {
    name: 'Requested',
    items: itemsFromBackend,
    id: nanoid(),
  },
  {
    name: 'To do',
    items: [],
    id: nanoid(),
  },
  {
    name: 'In Progress',
    items: [],
    id: nanoid(),
  },
  {
    name: 'Done',
    items: [],
    id: nanoid(),
  },
];

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  console.log(result);
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns.find((el: any) => el.id === source.droppableId);
    const destColumn = columns.find((el: any) => el.id === destination.droppableId);
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);

    setColumns((prev: any) =>
      prev.map((el: any) => {
        if (el.id === source.droppableId) {
          return { ...sourceColumn, items: sourceItems };
        }
        if (el.id === destination.droppableId) {
          return { ...destColumn, items: destItems };
        }
        return el;
      })
    );
  } else {
    const column = columns.find((el: any) => el.id === source.droppableId);
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns((prev: any) =>
      prev.map((el: any) =>
        el.id === source.droppableId
          ? {
              ...column,
              items: copiedItems,
            }
          : el
      )
    );
  }
};

export const Boards = () => {
  const [columns, setColumns] = React.useState(columnsFromBackend2);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <DragDropContext onDragEnd={(result: any) => onDragEnd(result, columns, setColumns)}>
        {/* <Droppable droppableId="droppable" type="droppableItem"> */}
        {/* {(provided: any) => (
          <div ref={provided.innerRef}> */}
        {columns.map((column, index) => {
          // <Draggable key={columnId} draggableId={columnId} index={index}></Draggable>;
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid red',
              }}
              key={column.id}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={column.id} key={column.id}>
                  {(provided: any, snapshot: any) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided: any, snapshot: any) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: 'none',
                                      padding: 16,
                                      margin: '0 0 8px 0',
                                      minHeight: '50px',
                                      backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                      color: 'white',
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
        {/* </div>
        )} */}
        {/* </Droppable> */}
      </DragDropContext>
    </div>
  );
};
