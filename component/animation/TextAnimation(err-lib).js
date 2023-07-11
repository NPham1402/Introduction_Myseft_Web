import { RandomReveal } from "react-random-reveal";

function TextAnimation({ text }) {
  return (
    <RandomReveal
      isPlaying
      revealEasing="easeInQuad"
      duration={1}
      characterSet={[
        "W",
        "H",
        "A",
        "M",
        "M",
        "Y",
        "2",
        "0",
        "1",
        "9",
        "@",
        "▉",
        "_",
        "*",
        "&",
        ")",
        "(",
        "=",
        "+",
        "$",
      ]}
      revealDuration={5}
      characters={text}
    />
  );
}

export default TextAnimation;
