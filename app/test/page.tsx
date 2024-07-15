"use client";

import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Field {
  key: string;
  type: string;
  order: number;
}

interface FieldsListProps {
  fields: Field[];
  setfields: (fields: Field[]) => void;
  handleRemoveField: (index: number) => void;
  handleAddField: () => void;
}
const App = ({
  handleAddField,
  handleRemoveField,
  fields,
  setfields,
}: FieldsListProps) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    setfields(updatedItems);
  };

  console.log(fields);

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map((item, index) => (
                <Draggable
                  key={index} // Use index as the key
                  draggableId={index.toString()} // Use index as the draggableId
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="flex justify-between gap-5 my-3"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="cursor-grab"
                      >
                        <Grip className="h-5 w-5" />
                      </div>
                      <Input
                        placeholder="Enter the Key"
                        onChange={(e) => {
                          const updatedFields = [...fields];
                          updatedFields[index].key = e.target.value;
                          setfields(updatedFields);
                        }}
                        value={item.key}
                      />
                      <Select
                        onValueChange={(value) => {
                          const updatedFields = [...fields];
                          updatedFields[index].type = value;
                          setfields(updatedFields);
                        }}
                        value={item.type}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Select the type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="input">Input</SelectItem>
                          {/* Add more SelectItem options as needed */}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveField(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button type="button" size="sm" onClick={handleAddField}>
        Add Field
      </Button>
    </>
  );
};

export default App;
