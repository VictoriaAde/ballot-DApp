import { Box, Container, Flex, Text } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import Proposal from "./component/Proposal";
import DelegateVote from "./component/DelegateVote";
import useProposals from "./hooks/useProposals";
import useVote from "./hooks/useVote";
import { useState } from "react";

configureWeb3Modal();

function App() {
  const { loading, data: proposals } = useProposals();
  const [id] = useState(0);
  const voteFunction = useVote(id);

  return (
    <Container>
      <Header />
      <main className="mt-6">
        <Box mb="4">
          <DelegateVote />
        </Box>

        <Flex wrap={"wrap"} gap={"6"}>
          {loading ? (
            <Text>Loading...</Text>
          ) : proposals.length !== 0 ? (
            proposals.map((item, index) => (
              <Proposal
                key={index}
                name={item.name}
                handleVote={voteFunction}
                id={id}
                voteCount={Number(item.voteCount)}
              />
            ))
          ) : (
            <Text>Could not get proposals!!</Text>
          )}
        </Flex>
      </main>
    </Container>
  );
}

export default App;
