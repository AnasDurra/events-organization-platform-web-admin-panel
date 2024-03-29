import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { CiText } from 'react-icons/ci';
import { MdRadioButtonChecked } from 'react-icons/md';
import SidebarItem from './SidebarItem';
import { SidebarItemsIndex } from './constants';

export default function Sidebar() {
  return (
    <Droppable
      droppableId='sidebar-items'
      key='sidebar-items'
      type='group-item'
      isDropDisabled={true}
    >
      {(provided, snapshot) => (
        <div
          className='h-full w-full'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Draggable
            key={'draggable-textField'}
            draggableId={'draggable-textField'}
            index={SidebarItemsIndex.TEXTFIELD}
          >
            {(provided, snapshot) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                }}
                ref={provided.innerRef}
              >
                <SidebarItem
                  title={'text field'}
                  Icon={<CiText />}
                />
              </div>
            )}
          </Draggable>

          <Draggable
            key={'draggable-radio'}
            draggableId={'draggable-radio'}
            index={SidebarItemsIndex.RADIO}
          >
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{ ...provided.draggableProps.style }}
                ref={provided.innerRef}
              >
                <SidebarItem
                  title={'radio'}
                  Icon={<MdRadioButtonChecked />}
                />
              </div>
            )}
          </Draggable>

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
