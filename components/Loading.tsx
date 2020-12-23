import styled, { keyframes } from "styled-components";

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
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoadingText = styled.div`
  margin-top: 15px;
  font: 600 20px "Open Sans", monospace;
`;

const Loading = () => {
  return (
    <LoaderWrapper>
      <Loader />
      <LoadingText style={{ color: "white" }}>Loading...</LoadingText>
    </LoaderWrapper>
  );
};

export default Loading;
