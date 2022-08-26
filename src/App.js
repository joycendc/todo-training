import React, { useState } from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import TodoList from "../components/TodoList";
import Filter from "../components/Filter";
import Navbar from "../components/Navbar";
import {
  ALL_BUTTON_VALUE,
  ACTIVE_BUTTON_VALUE,
  getItemStyle,
  reorder
} from "../helper";

export default function App() {
  const bgColor = useColorModeValue("lightBg", "darkBg");
  const [todoList, setTodoList] = useState([]);
  const [itemsLeft, setItemsLeft] = useState(0);
  const [showAll, setShowAll] = useState(true);
  const [showActive, setShowActive] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showCompleted, setShowCompleted] = useState(false);

  const clearCompletedTodo = () => {
    const updatedTodoList = todoList.filter((todo) => !todo.isCompleted);
    setTodoList(updatedTodoList);
  };

  const handleFilterClick = (e) => {
    switch (e.target.value) {
      case ALL_BUTTON_VALUE:
        setShowAll(true);
        setShowActive(false);
        setShowCompleted(false);
        break;
      case ACTIVE_BUTTON_VALUE:
        setShowAll(false);
        setShowActive(true);
        setShowCompleted(false);
        break;
      default:
        setShowAll(false);
        setShowActive(false);
        setShowCompleted(true);
    }
  };

  return (
    <Box h="100vh" w="100vw" bg={bgColor}>
      <Navbar />
      <Flex w="full" h="full">
        <Flex w="150px">
          <Filter
            onAllClick={handleFilterClick}
            onActiveClick={handleFilterClick}
            onCompletedClick={handleFilterClick}
            onClearClick={clearCompletedTodo}
            itemsLeft={itemsLeft}
            showAll={showAll}
            setShowAll={setShowAll}
            showActive={showActive}
            setShowActive={setShowActive}
          />
        </Flex>
        <Flex flexDir="column" w="calc(100% - 150px)" p="4">
          <TodoList
            showAll={showAll}
            setShowAll={setShowAll}
            showActive={showActive}
            setShowActive={setShowActive}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
