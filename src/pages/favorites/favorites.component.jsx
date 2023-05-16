import { Center, rem } from "@mantine/core";
import EmptyState from "../../components/emptyState/emptyState.component";

const Favorites = () => {
  return (
    <Center mt={rem(120)}>
      <EmptyState />
    </Center>
  );
};

export default Favorites;