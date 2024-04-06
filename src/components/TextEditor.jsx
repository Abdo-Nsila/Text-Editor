import React, { useState, useRef, useEffect } from "react";

function TextEditor() {
  const [lines, setLines] = useState([""]);
  const [currentLine, setCurrentLine] = useState(0);
  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current.focus();
  }, []);

  const handleKeyDown = (event) => {
    const { key, keyCode } = event;

    if (keyCode === 13) {
      // Enter key
      event.preventDefault();
      const newLines = [...lines];
      newLines.splice(currentLine + 1, 0, "");
      setLines(newLines);
      setCurrentLine(currentLine + 1);
    } else if (keyCode === 8 && lines[currentLine] === "") {
      // Backspace key
      event.preventDefault();
      if (currentLine > 0) {
        const newLines = [...lines];
        newLines.splice(currentLine, 1);
        setLines(newLines);
        setCurrentLine(currentLine - 1);
      }
    }
  };

  const handleChange = (event) => {
    setLines(event.target.value.split("\n"));
  };

  return (
    <div className="flex bg-stone-900 min-h-[100vh] h-auto min-w-[100vw] w-auto overflow-x-scroll">
      <div className="w-20 bg-stone-900 text-zinc-400 border-r border-gray-300 p-2">
        {lines.map((_, index) => (
          <div key={index} className="w-full text-center">
            {index + 1}
          </div>
        ))}
      </div>
      <textarea
        className="flex-1 bg-stone-900 text-[#6185cd] caret-white border-none outline-none p-2 font-bold resize-none overflow-hidden whitespace-pre-wrap break-words"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        aria-label="HTML Code Editor"
        tabIndex="0"
        value={lines.join("\n")}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={editorRef}
      />
    </div>
  );
}

export default TextEditor;
