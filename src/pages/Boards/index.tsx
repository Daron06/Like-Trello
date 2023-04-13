import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Boards.module.scss';
import { BoardСolumn } from '../../components/Pages/Board/BoardСolumn';
import { BoardButton } from '../../components/Pages/Board/BoardButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addColumn, reorderBoard } from '../../features/board/boardSlice';
import { BoardState } from '../../features/board/types';
import { nanoid } from 'nanoid';

const reorder = (list: BoardState['board'], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const itemsFromBackend = [
  { id: nanoid(), content: 'First task' },
  { id: nanoid(), content: 'Second task' },
  { id: nanoid(), content: 'Third task' },
  { id: nanoid(), content: 'Fourth task' },
  { id: nanoid(), content: 'Fifth task' },
];

const columnsFromBackend = [
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
export const Boards = () => {
  const columns = useAppSelector((state) => state.board.board);
  const dispatch = useAppDispatch();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination, type } = result;
    if (type === 'droppableItem') {
      const sourceIndex = result.source.index;
      const destIndex = result.destination.index;
      const items = reorder(columns, sourceIndex, destIndex);
      dispatch(reorderBoard(items));
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.find((el) => el.id === source.droppableId);
      const destColumn = columns.find((el) => el.id === destination.droppableId);

      if (!destColumn || !sourceColumn) return;

      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      dispatch(
        reorderBoard(
          columns.map((el) => {
            if (el.id === source.droppableId) {
              return { ...sourceColumn, items: sourceItems };
            }
            if (el.id === destination.droppableId) {
              return { ...destColumn, items: destItems };
            }
            return el;
          })
        )
      );
    } else {
      const column = columns.find((el) => el.id === source.droppableId);

      if (!column) return;

      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      const reorderItem = { ...column, items: copiedItems };
      dispatch(
        reorderBoard(columns.map((el) => (el.id === source.droppableId ? reorderItem : el)))
      );
    }
  };

  console.log(columns);

  const handleAddColumn = () => {
    dispatch(addColumn('New Column'));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" type="droppableItem" direction="horizontal">
        {(provided: any) => (
          <div className={styles.root} ref={provided.innerRef}>
            {columns.map((column, index: number) => {
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
            <BoardButton
              onClick={handleAddColumn}
              imgType="board-plus"
              text="Добавьте ещё одну колонку"
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
