import { Link } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  font-weight: 300;
`;

const TextBlock = styled.div`
  overflow-wrap: anywhere;
  padding-bottom: 5px;
  padding-top: 5px;
  font-weight: 400;
`;

const Version = styled.div`
  overflow-wrap: anywhere;
  font-size: 12px;
  padding-bottom: 5px;
  padding-top: 5px;
`;

const CustomLink = styled(Link)`
  font-weight: 500;
  color: #00c400;
  text-decoration: none;

  &:visited {
    color: #00c400;
    font-weight: 500;
  }
  &:hover {
    color: #88ff88;
    font-weight: 500;
  }
`;

const CodeLike = styled.span`
  font-family: "Source Code Pro";
  font-weight: 500;
`;
function Intro() {
  return (
    <div>
      <Title>
        <CodeLike>The Safe{"{Core}"} SDK Wrappers</CodeLike>
      </Title>
      <TextBlock>
        The Safe{"{Core}"} SDK Wrappers are a port of the{" "}
        <CustomLink to={"https://safe.global/core"} target={"_blank"}>
          Safe{"{Core}"} SDK
        </CustomLink>{" "}
        as a collection of Polywrap Wrappers.
        <br />
        They consist of the main{" "}
        <CustomLink to="/account-abstraction">
          Account Abstraction Wrapper
        </CustomLink>
        , and a series of supporting Wrappers: <br />
        <ul>
          <li>
            <CustomLink to={"/relay"}>Relayer</CustomLink>
          </li>
          <li>
            <CustomLink to={"/gelato-relay"}>Gelato Relay</CustomLink>
          </li>
          <li>
            <CustomLink to={"/safe-contracts"}>Safe Contracts</CustomLink>
          </li>
          <li>
            <CustomLink to={"/safe-factory"}>Safe Factory</CustomLink>
          </li>
          <li>
            <CustomLink to={"/safe-manager"}>Safe Manager</CustomLink>
          </li>
          <li>
            <CustomLink to={"/ethereum"}>Ethereum</CustomLink>
          </li>
        </ul>
        <br />
        Make sure to check out the{" "}
        <CustomLink
          to={"/account-abstraction/example/Execute%20Sponsored%20Transaction"}
        >
          Execute Sponsored Transaction Example
        </CustomLink>{" "}
        for a live demo of its functionality!
        <br />
      </TextBlock>
      <TextBlock>
        Github links:
        <ul>
          <li>
            <CustomLink
              to={"https://github.com/cbrzn/account-abstraction-wrapper"}
            >
              Account Abstraction and Relay Wrappers Github
            </CustomLink>
          </li>
          <li>
            <CustomLink to={"https://github.com/cbrzn/gelato-relay-polywrap"}>
              Gelato Relay Wrapper Github
            </CustomLink>
          </li>
          <li>
            <CustomLink
              to={"https://github.com/polywrap/safe-contracts-wrapper"}
            >
              Safe Contracts, Factory, and Manager Wrappers Github
            </CustomLink>
          </li>
          <li>
            <CustomLink to={"https://github.com/polywrap/ethereum"}>
              Ethereum Wrapper Github
            </CustomLink>
          </li>
        </ul>
      </TextBlock>
      <Version>Built with Polywrap ~0.10.13-pre.</Version>
    </div>
  );
}

export default Intro;
