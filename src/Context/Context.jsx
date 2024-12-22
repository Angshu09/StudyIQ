import { createContext, useEffect, useState } from "react";
import run from "../Config/StudyIQ";
import DOMPurify from "dompurify";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState(""); // Here we are going to save the input from the user
  const [recent, setRecent] = useState(""); // When user presses send button, the input will be saved here
  const [prev, setPrev] = useState([]); // Used to store the input history
  const [showResult, setShowResult] = useState(false); // Used to hide the greet section
  const [loading, setLoading] = useState(false); // Displays loading animation dynamically
  const [resultData, setResultData] = useState(""); // Used to display the result in webpage
  const [responseData, setResponseData] = useState([]); // Initialize as an empty array for question data

  // Function to decode HTML entities
  const decodeHTMLEntities = (text) => {
    const parser = new DOMParser(); // This is a built-in browser API that parses strings of text into structured HTML or XML documents.
    // parseFromString: Converts the input string (text) into an HTML document.
    // documentElement.textContent: Extracts the text content of the parsed HTML document, which now contains decoded
    return parser.parseFromString(text, "text/html").documentElement.textContent;
  };

  // Fetch and process data from the API
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=4&category=18&type=multiple")
    .then((res) => res.json())
    .then((data) => {
    const questions = data.results.map((item) =>
        decodeHTMLEntities(item.question)
    );
    setResponseData(questions); // Save only the questions in state
    })
    .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const delay = (idx, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * idx);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSend = async (prompt) => {
    setResultData("");
    setInput("");
    setLoading(true);
    setShowResult(true);
    if (prompt === undefined) {
      setPrev((prev) => [...prev, input]);
      setRecent(input);
    }

    try {
      let response =
        prompt !== undefined ? await run(prompt) : await run(input);

      // Split response into array and format bold tags
      const resArray = response.split("**");
      let formattedTextArray = resArray.map((item, index) =>
        index % 2 === 1 ? `<b>${item}</b>` : item
      );

      // Join the array into a single string
      let formattedText = formattedTextArray.join("");

      // Replace `*` with `<br>`
      formattedText = formattedText.split("*").join("<br>");

      // Sanitize HTML to prevent XSS
      const sanitizedText = DOMPurify.sanitize(formattedText);

      // Process the sanitized text word-by-word
      const words = sanitizedText.split(" ");
      words.forEach((word, i) => delay(i, word + " "));

      setLoading(false);
    } catch (error) {
      console.error("Error processing prompt:", error);
      setLoading(false);
    }
  };

  const contextValue = {
    onSend,
    input,
    setInput,
    recent,
    setRecent,
    prev,
    setPrev,
    showResult,
    loading,
    resultData,
    newChat,
    responseData, 
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
