import { useState } from "react";

const useUndoRedo = (initialValue) => {
    const [history, setHistory] = useState([initialValue]); // Store history of states
    const [currentIndex, setCurrentIndex] = useState(0); // Track current state index

    const setValue = (newValue) => {
        if (history[currentIndex] !== newValue) { // Avoid duplicate entries
            const newHistory = history.slice(0, currentIndex + 1); // Remove future states after undo
            newHistory.push(newValue);
            setHistory(newHistory);
            setCurrentIndex(newHistory.length - 1);
        }
    };

    return [history[currentIndex], setValue];
};

export default useUndoRedo;

