import { useNavigate, useParams } from "react-router-dom";
import {
  createPolywrapProvider,
  usePolywrapClient,
} from "@polywrap/react";
import styled from "styled-components";
import { ComplexExample } from "../constants/examples";
import ComplexExampleRunner from "./ComplexExampleRunner";

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
  const { name, method } = example;
  const navigate = useNavigate();
  const client = usePolywrapClient({ provider });
  console.log(client.getConfig());
  return (
    <>
      <Header>
        <Title>{name}</Title>
      </Header>
      <Description>This is a multi-step example. New examples will appear below the existing ones once the existing ones finish running.</Description>
      <ComplexExampleRunner client={client} example={example} id={id} />
    </>
  );
}

function ComplexExampleContainer(props: ComplexExampleContainerProps) {
  const { example } = props;

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
        <ComplexExampleWithClientContainer {...props} provider={"custom"} />
      </CustomProvider>
    );
  }

  return <ComplexExampleWithClientContainer {...props} />;
}

export default ComplexExampleContainer;
