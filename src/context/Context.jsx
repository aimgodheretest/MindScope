import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState([]);
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    const finalPrompt = prompt || input;
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(finalPrompt);
    setPrevPrompt((prev) => [...prev, finalPrompt]);

    let wordIndex = 0;
    await runChat(input, (chunk) => {
      // Split chunk into words
      const words = chunk.split(" ");

      words.forEach((word) => {
        delayPara(wordIndex++, word + " "); // add space after each word
      });
    });
    setLoading(false);
    setInput("");
  };
  const contextValue = {
    recentPrompt,
    prevPrompt,
    showResult,
    loading,
    resultData,
    input,
    setRecentPrompt,
    setPrevPrompt,
    setInput,
    onSent,
    newChat,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
