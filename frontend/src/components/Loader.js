import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderWrapper>
      <div className="loader"></div>
    </LoaderWrapper>
  );
};

export default Loader;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0%;
  left: 0%;
  position: relative;
  padding: 2px;
  .loader {
    position: relative;
    top: 50%;
    left: 50%;
    height: 20px;
    width: 20px;
    margin: -10px 0 0 -10px;
    transform: translate(-50%, -50%);
    border: 4px rgba(0, 0, 0, 0.25) solid;
    border-top: 4px ${({ theme }) => theme.text.primary} solid;
    border-radius: 50%;
    -webkit-animation: spin2 1s infinite linear;
    animation: spin2 1s infinite linear;
  }
  @-webkit-keyframes spin2 {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
  @keyframes spin2 {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
`;
