import { useState, useRef, useEffect } from "react";

function TextEditor() {
  const [lines, setLines] = useState([""]);
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const textareaRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setLines([
        ...lines.slice(0, activeLineIndex + 1),
        "",
        ...lines.slice(activeLineIndex + 1),
      ]);
      setActiveLineIndex(activeLineIndex + 1);
    } else if (event.key === "Backspace" && lines[activeLineIndex] === "") {
      setLines([
        ...lines.slice(0, activeLineIndex),
        ...lines.slice(activeLineIndex + 1),
      ]);
      setActiveLineIndex(Math.max(activeLineIndex - 1, 0));
    } else if (event.key === "a" && event.ctrlKey) {
      event.preventDefault();
      if (index === activeLineIndex) {
        textareaRef.current.select();
      }
    }
  };

  const handleChange = (event, index) => {
    setLines([
      ...lines.slice(0, index),
      event.target.value,
      ...lines.slice(index + 1),
    ]);
  };

  const handleLineClick = (index) => {
    setActiveLineIndex(index);
    textareaRef.current.focus();
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");
    const pastedLines = pastedText.split("\n");

    setLines([
      ...lines.slice(0, activeLineIndex + 1),
      ...pastedLines,
      ...lines.slice(activeLineIndex + 1),
    ]);
    setActiveLineIndex(activeLineIndex + pastedLines.length);
  };

  return (
    <div className="h-[100vh] min-w-[100vw] w-auto bg-stone-900 overflow-x-scroll p-3">
      <div className="line-numbers w-auto text-white">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`${
              index === activeLineIndex ? "active-line" : ""
            } flex w-full h-6 items-center text-white`}
            onClick={() => handleLineClick(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            tabIndex={0}
          >
            <div className="h-full w-10!">{index + 1}</div>
            {index === activeLineIndex ? (
              <input
                ref={textareaRef}
                className="h-full min-w-full w-auto bg-transparent text-white text-sm space focus:ring-2 focus:ring-zinc-800 outline-none resize-none"
                value={line}
                onChange={(event) => handleChange(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                onPaste={handlePaste}
                onClick={(event) => event.stopPropagation()}
                autoFocus
              />
            ) : (
              <span
                className="h-full min-w-full w-auto cursor-text text-white text-sm space focus:ring-2 focus:ring-transparent outline-none resize-none"
                style={
                  index === activeLineIndex
                    ? { outline: "2px solid blue" }
                    : { outline: "none" }
                }
              >
                <pre>{line}</pre>
              </span>
            )}
          </div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        value={lines[activeLineIndex]}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        aria-label="HTML Code Editor"
        tabIndex="0"
        style={{
          position: "fixed",
          top: -1000,
          left: 0,
          opacity: 0,
        }}
      />
    </div>
  );
}

export default TextEditor;
