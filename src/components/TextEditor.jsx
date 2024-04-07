import React, { useState, useRef, useEffect } from "react";

function TextEditor() {
  const [lines, setLines] = useState([""]);
  const [currentLine, setCurrentLine] = useState(0);
  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current.focus();
  }, []);

  const handleChange = (event) => {
    setLines(event.target.value.split("\n"));
  };

  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
      const element = document.createElement("a");
      const file = new Blob([lines.join("\n")], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "myFile.txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }
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
        className="relative top-2 left-1 flex-1 bg-stone-900 text-[#6185cd] caret-white border-none outline-none  font-bold resize-none overflow-hidden whitespace-pre-wrap break-words"
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
