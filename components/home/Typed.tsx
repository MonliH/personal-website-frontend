import { useState } from "react";
import styled from "styled-components";

import useInterval from "@hooks/useInterval";

function getRandomInt(min: number, max: number) {
  const minNew = Math.ceil(min);
  const maxNew = Math.floor(max);
  return Math.floor(Math.random() * (maxNew - minNew) + minNew);
}

const wholeWordTime = 760;
const emptyWordTime = 300;

const BlinkingSpan = styled.div`
  position: relative;
  animation: blink 1s ease 0s infinite normal none;
  width: 2px;
  background-color: #ffffff;
  height: 32px;
  display: inline-block;
  top: 2px;
  margin-left: 3px;
  @keyframes blink {
    30% {
      opacity: 1;
    }
    40% {
      opacity: 0;
    }
    70% {
      opacity: 0;
    }
    80% {
      opacity: 1;
    }
  }
`;

const Cursor = () => {
  return <BlinkingSpan />;
};

const Typed = ({ items }: { items: string[] }) => {
  const [current, setCurrent] = useState("");
  const [idx, setIdx] = useState(0);
  const [growing, setGrowing] = useState(true);

  const step = () => {
    if (current.length >= items[idx].length && growing) {
      // at end of string
      setGrowing(false);
    } else if (current.length === 0 && !growing) {
      // at start of string
      setIdx((idx + 1) % items.length);
      setGrowing(true);
    } else if (growing) {
      setCurrent((curr) => items[idx].slice(0, curr.length + 1));
    } else {
      setCurrent((curr) => items[idx].slice(0, curr.length - 1));
    }
  };

  let interval: number;
  if (current.length === 0) {
    interval = emptyWordTime;
  } else if (current.length === items[idx].length) {
    interval = wholeWordTime;
  } else {
    interval = getRandomInt(30, 70);
  }

  useInterval(step, interval);

  return (
    <span>
      {current}
      <Cursor />
    </span>
  );
};

export default Typed;
