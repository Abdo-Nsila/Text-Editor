import React, { useState, useRef, useEffect } from "react";

function Line({
  line,
  number,
  onLineSelect,
  isSelected,
  onLineChange,
  onEnterPress,
  onBackspacePress,
  lineRef,
}) {
  const divRef = useRef(null);

  useEffect(() => {
    const div = divRef.current;
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(div);
    range.collapse(false); // Set the cursor at the end of the div
    selection.removeAllRanges();
    selection.addRange(range);
  }, [line]);

  useEffect(() => {
    if (isSelected) {
      divRef.current.focus();
    }
  }, [isSelected]);

  const handleLineClick = () => {
    onLineSelect(number);
  };

  const handleLineChange = (event) => {
    onLineChange(number, event.target.textContent);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents the creation of a new line in the contentEditable div
      onEnterPress(number);
    } else if (event.key === "Backspace" && line === "") {
      event.preventDefault(); // Prevents the browser from going back
      onBackspacePress(number);
    }
  };

  return (
    <div
      className={`flex h-6 min-w-full w-fit cursor-text ${
        isSelected ? "focus:ring-2 focus:ring-zinc-800" : ""
      }`}
      onClick={handleLineClick}
      ref={lineRef}
    >
      <div
        ref={divRef}
        className="flex-1"
        contentEditable
        suppressContentEditableWarning
        onInput={handleLineChange}
        onKeyDown={handleKeyDown}
      >
        {line}
      </div>
    </div>
  );
}

function TextEditor() {
  const [lines, setLines] = useState([""]);
  const [selectedLineIndex, setSelectedLineIndex] = useState(null);
  const lineRefs = lines.map(() => React.createRef());

  const handleLineSelect = (index) => {
    setSelectedLineIndex(index);
  };

  const handleLineChange = (index, value) => {
    const newLines = [...lines];
    newLines[index] = value;
    setLines(newLines);
  };

  const handleEnterPress = (index) => {
    const newLines = [...lines];
    newLines.splice(index + 1, 0, ""); // Adds a new line after the current line
    setLines(newLines);
    setSelectedLineIndex(index + 1); // Selects the new line
  };

  const handleBackspacePress = (index) => {
    if (index > 0) {
      const newLines = [...lines];
      newLines.splice(index, 1); // Removes the current line
      setLines(newLines);
      setSelectedLineIndex(index - 1); // Selects the previous line
    }
  };

  return (
    <div className="min-h-[100vh] h-auto min-w-[100%] w-auto bg-stone-900 py-3 flex relative">
      <div className="overflow-y-auto overflow-x-hidden pr-4 w-20 flex-none sticky top-0 bg-stone-900">
        {lines.map((_, index) => (
          <div
            key={index}
            className="bg-stone-900 text-zinc-400 text-center select-none w-20"
            onClick={() => handleLineSelect(index)}
          >
            {index}
          </div>
        ))}
      </div>
      <div
        className="overflow-auto text-white flex-auto"
        onScroll={(event) => {
          document.querySelector(".sticky").scrollTop = event.target.scrollTop;
        }}
      >
        {lines.map((line, index) => (
          <Line
            key={index}
            number={index}
            line={line}
            isSelected={index === selectedLineIndex}
            onLineSelect={handleLineSelect}
            onLineChange={handleLineChange}
            onEnterPress={handleEnterPress}
            onBackspacePress={handleBackspacePress}
            lineRef={lineRefs[index]}
          />
        ))}
      </div>
    </div>
  );
}

export default TextEditor;
