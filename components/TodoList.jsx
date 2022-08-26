import { Box, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { getItemStyle, reorder } from "../helper";
import useTodoStore from "../store/todoStore";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const todos = useTodoStore((state) => state.todos);
  const showAll = useTodoStore((state) => state.showAll);
  const showActive = useTodoStore((state) => state.showActive);
  const setTodos = useTodoStore((state) => state.setTodos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const toggleCompletedState = useTodoStore(
    (state) => state.toggleCompletedState
  );

  const containerColor = useColorModeValue("lightContainer", "darkContainer");
  const inactiveColor = useColorModeValue(
    "lightInactiveFilter",
    "darkCompletedTodo"
  );

  const handleAddTodo = () => {
    if (inputValue) {
      const newTodo = {
        id: todos.length + 1,
        value: inputValue,
        isCompleted: false
      };

      addTodo(newTodo);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    removeTodo(id);
  };

  const setCompletedTodo = (id) => {
    toggleCompletedState(id);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(todos, result.source.index, result.destination.index);

    setTodos(items);
  };

  return (
    <>
      <TodoInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onButtonClick={handleAddTodo}
        onEnterPress={handleAddTodo}
      />
      {todos?.length > 0 && (
        <Box>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <VStack
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  borderTopRadius={6}
                  bg={containerColor}
                  alignItems="flex-start"
                  spacing={0}
                  overflow="hidden"
                >
                  {showAll
                    ? todos.map((todo, index) => (
                        <Draggable
                          key={todo.id}
                          draggableId={todo.id + ""}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <TodoItem
                                bg={containerColor}
                                key={todo.id}
                                id={todo.id}
                                value={todo.value}
                                completed={todo.isCompleted}
                                onCrossClick={deleteTodo}
                                onButtonClick={setCompletedTodo}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    : showActive
                    ? todos
                        .filter((todo) => !todo.isCompleted)
                        .map((todo) => (
                          <TodoItem
                            key={todo.id}
                            id={todo.id}
                            value={todo.value}
                            completed={todo.isCompleted}
                            onCrossClick={deleteTodo}
                            onButtonClick={setCompletedTodo}
                          />
                        ))
                    : todos
                        .filter((todo) => todo.isCompleted)
                        .map((todo) => (
                          <TodoItem
                            key={todo.id}
                            id={todo.id}
                            value={todo.value}
                            completed={todo.isCompleted}
                            onCrossClick={deleteTodo}
                            onButtonClick={setCompletedTodo}
                          />
                        ))}
                  {provided.placeholder}
                </VStack>
              )}
            </Droppable>
          </DragDropContext>

          {showAll && (
            <Text
              color={inactiveColor}
              fontSize="14px"
              mt="60px"
              textAlign="center"
            >
              Drag and drop to reorder list
            </Text>
          )}
        </Box>
      )}
    </>
  );
};

export default TodoList;
