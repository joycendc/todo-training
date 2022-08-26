import {
  ButtonGroup,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import React, { useState } from "react";
import FilterButton from "./FilterButton";
import {
  ACTIVE_BUTTON_VALUE,
  ALL_BUTTON_VALUE,
  COMPLETED_BUTTON_VALUE
} from "../helper";

const Filter = ({
  itemsLeft,
  onAllClick,
  onActiveClick,
  onCompletedClick,
  onClearClick
}) => {
  const [activeButton, setActiveButton] = useState(ALL_BUTTON_VALUE);

  const isMobileSize = useBreakpointValue({
    base: true,
    md: false
  });
  const containerColor = useColorModeValue("lightContainer", "darkContainer");
  const inactiveColor = useColorModeValue(
    "lightInactiveFilter",
    "darkCompletedTodo"
  );
  const hoverColor = useColorModeValue("lightTodoText", "darkTodoText");

  const handleAllClick = (e) => {
    setActiveButton(e.target.value);
    onAllClick(e);
  };

  const handleActiveClick = (e) => {
    setActiveButton(e.target.value);
    onActiveClick(e);
  };

  const handleCompletedClick = (e) => {
    setActiveButton(e.target.value);
    onCompletedClick(e);
  };
  return (
    <>
      {/* <Flex
        bg={containerColor}
        w="full"
        justify="center"
        borderBottomRadius={6}
      >
        {!isMobileSize && (
          <VStack spacing={4} w="full">
            <FilterButton
              isActive={activeButton === ALL_BUTTON_VALUE}
              value={ALL_BUTTON_VALUE}
              onClick={handleAllClick}
            />
            <FilterButton
              isActive={activeButton === ACTIVE_BUTTON_VALUE}
              value={ACTIVE_BUTTON_VALUE}
              onClick={handleActiveClick}
            />
            <FilterButton
              isActive={activeButton === COMPLETED_BUTTON_VALUE}
              value={COMPLETED_BUTTON_VALUE}
              onClick={handleCompletedClick}
            />
          </VStack>
        )}
      </Flex> */}

      {isMobileSize && (
        <Flex
          bg={containerColor}
          w="full"
          align="center"
          rounded={6}
          flexDir="column"
        >
          <VStack spacing={4} w="full" mt="4">
            <FilterButton
              isActive={activeButton === ALL_BUTTON_VALUE}
              value={ALL_BUTTON_VALUE}
              onClick={handleAllClick}
            />
            <FilterButton
              isActive={activeButton === ACTIVE_BUTTON_VALUE}
              value={ACTIVE_BUTTON_VALUE}
              onClick={handleActiveClick}
            />
            <FilterButton
              isActive={activeButton === COMPLETED_BUTTON_VALUE}
              value={COMPLETED_BUTTON_VALUE}
              onClick={handleCompletedClick}
            />
          </VStack>
        </Flex>
      )}
    </>
  );
};

export default Filter;
