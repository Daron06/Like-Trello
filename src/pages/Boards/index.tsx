import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Boards.module.scss';
import { BoardСolumn } from '../../components/Pages/Board/BoardСolumn';
import { BoardButton } from '../../components/Pages/Board/BoardButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const Boards = () => {
  const [columns, setColumns] = React.useState<any>(columnsFromBackend2);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination, type } = result;

    if (type === 'droppableItem') {
      const sourceIndex = result.source.index;
      const destIndex = result.destination.index;

      const items = reorder(columns, sourceIndex, destIndex);

      setColumns(items);
      return;
    }

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" type="droppableItem" direction="horizontal">
        {(provided: any) => (
          <div className={styles.root} ref={provided.innerRef}>
            {columns.map((column: any, index: number) => {
              return (
                <BoardСolumn
                  title={column.name}
                  id={column.id}
                  key={column.id}
                  index={index}
                  cards={column.items}
                />
              );
            })}
            {provided.placeholder}
            <BoardButton imgType="board-plus" text="Добавьте ещё одну колонку" />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
