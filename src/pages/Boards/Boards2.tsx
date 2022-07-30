// @ts-nocheck
import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Cards2 } from './Cards2';
const static_items = [
  {
    id: '1',
    content: 'item 1 content',
    subItems: [
      {
        id: '10',
        content: 'SubItem 10 content',
      },
      {
        id: '11',
        content: 'SubItem 11 content',
      },
    ],
  },
  {
    id: '2',
    content: 'item 2 content',
    subItems: [
      {
        id: '20',
        content: 'SubItem 20 content',
      },
      {
        id: '21',
        content: 'SubItem 21 content',
      },
    ],
  },
];

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export class Boards2 extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      items: static_items,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result: any) {
    // dropped outside the list
    console.log(result);
    console.log('innner drag');
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (result.type === 'droppableItem') {
      const items = reorder(this.state.items, sourceIndex, destIndex);

      this.setState({
        items,
      });
    } else if (result.type === 'droppableSubItem') {
      console.log('droppableSubItem');
      const itemSubItemMap = this.state.items.reduce((acc, item) => {
        acc[item.id] = item.subItems;
        return acc;
      }, {});

      const sourceParentId = parseInt(result.source.droppableId);
      const destParentId = parseInt(result.destination.droppableId);

      const sourceSubItems = itemSubItemMap[sourceParentId];
      const destSubItems = itemSubItemMap[destParentId];

      let newItems = [...this.state.items];

      /** In this case subItems are reOrdered inside same Parent */
      if (sourceParentId === destParentId) {
        const reorderedSubItems = reorder(sourceSubItems, sourceIndex, destIndex);
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.subItems = reorderedSubItems;
          }
          return item;
        });
        this.setState({
          items: newItems,
        });
      } else {
        let newSourceSubItems = [...sourceSubItems];
        const [draggedItem] = newSourceSubItems.splice(sourceIndex, 1);

        let newDestSubItems = [...destSubItems];
        newDestSubItems.splice(destIndex, 0, draggedItem);
        newItems = newItems.map((item) => {
          if (item.id === sourceParentId) {
            item.subItems = newSourceSubItems;
          } else if (item.id === destParentId) {
            item.subItems = newDestSubItems;
          }
          return item;
        });
        this.setState({
          items: newItems,
        });
      }
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" type="droppableItem">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div>
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        {item.content}
                        <span
                          {...provided.dragHandleProps}
                          style={{
                            display: 'inline-block',
                            margin: '0 10px',
                            border: '1px solid #000',
                          }}
                        >
                          Drag
                        </span>
                        <Cards2 subItems={item.subItems} type={item.id} />
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
      </DragDropContext>
    );
  }
}
