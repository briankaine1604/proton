"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";

const Tiptap = ({
  onChange,
  content,
}: {
  content: string;
  onChange: (richText: string) => void;
}) => {
  // const handleChange = (newContent: string) => {
  //   onChange(newContent);
  // };

  const editor = useEditor({
    extensions: [StarterKit, Underline, Image],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-gray-700 items-start w-full gap-3 font-medium text-[16px] pt-4  outline-none bg-white mt-4 rounded-lg min-h-[150px] text-black",
      },
    },
    onUpdate: ({ editor }) => {
      // handleChange(editor.getHTML());
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="">
      <Toolbar editor={editor} content={content} />
      <EditorContent
        style={{ whiteSpace: "pre-line" }}
        editor={editor}
        placeholder="Write something..."
      />
    </div>
  );
};

export default Tiptap;
