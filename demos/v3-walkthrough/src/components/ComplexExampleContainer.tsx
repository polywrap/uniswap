import { useNavigate, useParams } from "react-router-dom";
import { createPolywrapProvider, usePolywrapClient } from "@polywrap/react";
import styled from "styled-components";
import { ComplexExample } from "../constants/examples";
import ComplexExampleRunner from "./ComplexExampleRunner";
import { Goerli, useEthers } from "@usedapp/core";

type ComplexExampleContainerProps = { example: ComplexExample; id: string };
const CustomProvider = createPolywrapProvider("custom");

function ComplexExampleWithClientContainer(
  props: ComplexExampleContainerProps & { provider?: string }
) {
  const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const Title = styled.h1`
    font-weight: 300;
  `;

  const Description = styled.div`
    font-weight: 300;
  `;

  const { example, id, provider } = props;
  const { name } = example;
  const navigate = useNavigate();
  const client = usePolywrapClient({ provider });

  return (
    <>
      <Header>
        <Title>{name}</Title>
      </Header>
      <Description>
        This is a multi-step example. New examples will appear below the
        existing ones once the existing ones finish running.
      </Description>
      <ComplexExampleRunner client={client} example={example} id={id} />
    </>
  );
}

function ComplexExampleContainer(props: ComplexExampleContainerProps) {
  const { example } = props;
  const { account, deactivate, activateBrowserWallet, chainId, switchNetwork, error } = useEthers();
  console.log("ERR", error);
  if (example.requiresWallet && !account) {
    return (
      <>
        This example requires a connected wallet.
        <button onClick={() => activateBrowserWallet()}>Connect wallet</button>
      </>
    );
  }
  console.log("CHAINID", chainId);
  if (example.requiresWallet && chainId !== Goerli.chainId) {
    return (
      <>
        You must be connected to the Goerli testnet for this example
        <button onClick={async () => await switchNetwork(Goerli.chainId)}>Switch to Goerli</button>
      </>
    );
  }

  if (example.getBuilderConfig) {
    const builderConfig = example.getBuilderConfig();

    return (
      <CustomProvider
        envs={builderConfig.envs}
        interfaces={builderConfig.interfaces}
        packages={builderConfig.packages}
        redirects={builderConfig.redirects}
        resolvers={builderConfig.resolvers}
        wrappers={builderConfig.wrappers}
      >
        {example.requiresWallet && <button onClick={() => deactivate()}>Disconnect</button>}
        <ComplexExampleWithClientContainer {...props} provider={"custom"} />
      </CustomProvider>
    );
  }

  return <ComplexExampleWithClientContainer {...props} />;
}

export default ComplexExampleContainer;
