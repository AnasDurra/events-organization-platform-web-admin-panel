import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import DroppableGroup from './DroppableGroup';
import Sidebar from './Sidebar';
import { SidebarItemsTypeByIndex, itemTypes } from './constants';
import initialData from './initial-state';
import PropertiesSidebar from './PropertiesSidebar';

const handleReorderGroupItems = (prevGroups, source, destination) => {
  return prevGroups.map((oldGroup) => {
    if (destination.droppableId === oldGroup.id) {
      const newFields = [...oldGroup.fields];

      newFields.splice(source.index, 1);
      newFields.splice(destination.index, 0, oldGroup.fields[source.index]);

      return {
        ...oldGroup,
        fields: newFields,
      };
    } else {
      return oldGroup;
    }
  });
};

const handleReorderGroups = (prevGroups, source, destination) => {
  const newGroups = [...prevGroups];
  newGroups.splice(source.index, 1);
  newGroups.splice(destination.index, 0, prevGroups[source.index]);
  return newGroups;
};

const handleSidebarToGroup = (prevGroups, source, destination) => {
  return prevGroups.map((oldGroup) => {
    const itemType = SidebarItemsTypeByIndex[source.index];
    if (destination.droppableId === oldGroup.id) {
      const newFields = [...oldGroup.fields];
      newFields.splice(destination.index, 0, {
        type: itemType,
        id: uuidv4(),
      });
      return {
        ...oldGroup,
        fields: newFields,
      };
    } else return oldGroup;
  });
};

const handleMoveItemFromGroupToAnotherGroup = (
  prevGroups,
  source,
  destination
) => {
  let newGroups = [...prevGroups];

  const sourceGroup = newGroups.find(
    (group) => group.id === source.droppableId
  );
  const destinationGroup = newGroups.find(
    (group) => group.id === destination.droppableId
  );

  const removedItem = sourceGroup.fields.splice(source.index, 1)[0];

  destinationGroup.fields.splice(destination.index, 0, removedItem);

  return newGroups;
};

export default function EditFormPage() {
  const [groups, setGroups] = useState(initialData);
  const [selectedField, setSelectedField] = useState(null);

  const handleSelectField = (field) => {
    setSelectedField((prevSelectedField) =>
      prevSelectedField && prevSelectedField.id === field.id ? null : field
    );
  };

  const handleUpdateFieldProperties = (updatedProperties) => {
    setGroups(
      groups.map((group) => ({
        ...group,
        fields: group.fields.map((field) => {
          if (field.id === selectedField.id) {
            return { ...field, properties: updatedProperties };
          }
          return field;
        }),
      }))
    );
  };

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { source, destination, type } = result;

        console.log(result);
        if (!destination) {
          return;
        }

        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }

        if (
          (destination.droppableId === source.droppableId) &
          (type === 'group-item')
        ) {
          console.log('same droppable / group-item');
          setGroups((prevGroups) => {
            return handleReorderGroupItems(prevGroups, source, destination);
          });
        }

        if (
          (destination.droppableId === source.droppableId) &
          (type === 'group')
        ) {
          console.log('same droppable / group');
          setGroups((prevGroups) => {
            return handleReorderGroups(prevGroups, source, destination);
          });
        }

        if (
          destination.droppableId !== source.droppableId &&
          source.droppableId === 'sidebar-items'
        ) {
          console.log('sidebar to group');
          setGroups((prevGroups) => {
            return handleSidebarToGroup(prevGroups, source, destination);
          });
        }

        if (
          destination.droppableId !== source.droppableId &&
          source.droppableId !== 'sidebar-items'
        ) {
          console.log('group to group');
          setGroups((prevGroups) => {
            return handleMoveItemFromGroupToAnotherGroup(
              prevGroups,
              source,
              destination
            );
          });
        }
      }}
    >
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-3 h-full w-full bg-slate-400 p-2'>
          <div className='h-full w-full p-4'>
            <Droppable
              droppableId={'base-form'}
              type='group'
            >
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {groups.map((group, index) => (
                    <Draggable
                      key={'draggable' + group.id}
                      draggableId={group.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style }}
                          ref={provided.innerRef}
                        >
                          <DroppableGroup
                            key={group.id}
                            groupId={group.id}
                            fields={group.fields}
                            selectedField={selectedField}
                            onSelectField={handleSelectField}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
        
        {selectedField ? (
          <PropertiesSidebar
            field={selectedField}
            onUpdateProperties={handleUpdateFieldProperties}
          />
        ) : (
          <Sidebar />
        )}
      </div>
    </DragDropContext>
  );
}
