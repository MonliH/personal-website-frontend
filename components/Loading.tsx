import styled, { keyframes } from "styled-components";

import Bg from "@components/Bg";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 6px solid #f3f3f3; /* Light grey */
  border-top: 6px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${rotate} 2s linear infinite;
`;

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Loading = () => {
  return (
    <Bg>
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    </Bg>
  );
};

export default Loading;
