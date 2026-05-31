import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [prevPrompts, setPrevPrompts] = useState([]);
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    function delayPara(index, nextWord) {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;
        const activePrompt = prompt !== undefined ? prompt : input;

        // FIX: Always add to prevPrompts (sidebar loads were skipped before)
        setPrevPrompts(prev => {
            if (prev.includes(activePrompt)) return prev;
            return [...prev, activePrompt];
        });
        setRecentPrompt(activePrompt);

        response = await runChat(activePrompt);

        // FIX: Process bold (**text**) markers correctly
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i % 2 === 1) {
                newResponse += "<b>" + responseArray[i] + "</b>";
            } else {
                newResponse += responseArray[i];
            }
        }

        // FIX: Replace lone * with <br> safely, then split on spaces for word animation
        const withBreaks = newResponse.split("*").join("<br>");
        const words = withBreaks.split(" ");

        for (let i = 0; i < words.length; i++) {
            const nextWord = words[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false);
        // FIX: Only clear input if user typed it (not a sidebar-loaded prompt)
        if (prompt === undefined) {
            setInput("");
        }
    };

    // FIX: Removed unnecessary `async` — no await inside
    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
        setInput("");
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
