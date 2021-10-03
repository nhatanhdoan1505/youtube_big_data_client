import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { channelAction } from "../channelSlice";
import { selectChannels, selectLoading } from "../channelSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hook";

function SearchBox() {
  const dispatch = useAppDispatch();
  const channels = useAppSelector(selectChannels);
  const loading = useAppSelector(selectLoading);

  const [label, setLabel] = useState("");

  const handerSearch = () => {
    dispatch(channelAction.getByLabel({ label }));
    console.log(channels);
  };

  const handerKeyPress = (event: any) => {
    if (event.key == "Enter") handerSearch();
  };

  const handerInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
  };

  return (
    <HStack>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="search"
          placeholder="Enter a channel label"
          onChange={handerInputChange}
          onKeyPress={handerKeyPress}
        />
        <Button
          ml={2}
          isLoading={loading}
          loadingText="Loading"
          colorScheme="red"
          variant="outline"
          spinnerPlacement="start"
          onClick={handerSearch}
        >
          Search
        </Button>
      </InputGroup>
    </HStack>
  );
}

export default SearchBox;
