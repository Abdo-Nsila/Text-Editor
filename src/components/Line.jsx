import React from "react";

function EditableLine({
  lineIndex,
  lineContent,
  handleTextChange,
  handleKeyDown,
  inputRef,
  text,
  setText,
}) {
  function handlePaste(event, lineIndex) {
    console.log("handlePaste", lineIndex);
    event.preventDefault();
    const paste = (event.clipboardData || window.clipboardData).getData("text");
    const newLines = paste.split("\n");
    const lines = text.split("\n");
    lines[lineIndex] = newLines[0];
    newLines.slice(1).forEach((newLine, index) => {
      lines.splice(lineIndex + index + 1, 0, newLine);
    });
    setText(lines.join("\n"));
  }

  return (
    <div className="flex h-6 w-auto items-center text-neutral-500 focus-within:text-neutral-300">
      <div className="w-20 text-center">{lineIndex + 1}</div>
      <input
        key={lineIndex}
        value={lineContent}
        onChange={(event) => handleTextChange(event, lineIndex)}
        onKeyDown={(event) => handleKeyDown(event, lineIndex)}
        onPaste={(event) => handlePaste(event, lineIndex)}
        ref={inputRef}
        className="h-full bg-transparent text-[#ffffffb1] text-sm font-mono space focus:ring-2 focus:ring-zinc-800 outline-none resize-none overflow-x-auto"
        style={{
          minWidth: "calc(100% - 80px)",
          // maxWidth: "100%",
          // backgroundColor: "#f00ff0",
          caretColor: "white",
          fontSize: "15px",
          paddingTop: "5px",
          paddingBottom: "5px",
        }}
      />
    </div>
  );
}

export default EditableLine;
 