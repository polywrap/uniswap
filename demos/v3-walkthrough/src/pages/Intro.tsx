import styled from "styled-components";

const Title = styled.h1``

const TextBlock = styled.div`
  overflow-wrap: anywhere;
  cursor: pointer;
  font-size: 14px;
  padding-bottom: 5px;
  padding-top: 5px;
`;

const Version = styled.div`
  overflow-wrap: anywhere;
  cursor: pointer;
  font-style: italic;
  font-size: 12px;
  padding-bottom: 5px;
  padding-top: 5px;
`;

function Intro() {
  return (
    <div>
      <Title>
        What's the Uniswap v3 wrapper?
      </Title>
      <TextBlock>
        The Uniswap v3 wrapper lets developers integrate Uniswap in any environment that has the Polywrap library installed.
      </TextBlock>
      <Version>
        Built with Polywrap ~0.10.0-pre.
      </Version>
    </div>
  );
}

export default Intro;