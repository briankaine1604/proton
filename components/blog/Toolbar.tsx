"use client";

import React, { useState } from "react";
import { type Editor } from "@tiptap/react";
import { UploadButton } from "@/utils/uploadthing";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  Image as Img,
  Loader2,
  AlignVerticalSpaceAround,
  Heading1,
  Heading3,
} from "lucide-react";

type Props = {
  editor: Editor | null;
  content: string;
  url?: string;
};

const Toolbar = ({ editor, content }: Props) => {
  // const [image, setImage] = useState<
  //   { name: string; size: number; key: string; url: string }[]
  // >([]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-gray-700 sticky top-[80px] z-30 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 bg-red-200"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 p-2 "
          }
        >
          <Bold className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 p-2 "
          }
        >
          <Italic className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 p-2 "
          }
        >
          <Underline className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 p-2 "
          }
        >
          <Strikethrough className="w-5 h-5" />
        </button>
        {/* <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 p-2 "
          }
        >
          <AlignVerticalSpaceAround className="w-5 h-5" />
        </button> */}
        {/* <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 p-2 "
          }
        >
          <Heading1 className="size-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 p-2 "
          }
        >
          <Heading2 className="size-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={
            editor.isActive("heading", { level: 3 })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 p-2 "
          }
        >
          <Heading3 className="size-5" />
        </button> */}

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 p-2 "
          }
        >
          <List className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 p-2 "
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 p-2 "
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 p-2 "
          }
        >
          <Code className="w-5 h-5" />
        </button>
        <UploadButton
          endpoint="imageUploader"
          appearance={{
            allowedContent: "hidden",
          }}
          content={{
            button({ ready, isUploading, uploadProgress }) {
              if (ready) return <Img className="w-5 h-5" />;
              if (isUploading) return <div>{uploadProgress}</div>;

              return <Loader2 className=" animate-spin h-5 w-5" />;
            },

            allowedContent({ ready, fileTypes, isUploading }) {
              if (!ready) return "";
              if (isUploading) return "";
              return ``;
            },
          }}
          onClientUploadComplete={(res) => {
            // Do something with the response
            if (res && res.length > 0) {
              // setImage(res);
              // console.log("The files: ", res);

              // Get the URL of the first uploaded image
              const imageUrl = res[0].url;

              // Insert the image into the editor
              editor.chain().focus().setImage({ src: imageUrl }).run();
            }
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white hover:rounded-lg p-2 "
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-2 hover:rounded-lg"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>
      {/* {content && (
        <button
          type="submit"
          className="px-4 bg-sky-700 text-white py-2 rounded-md"
        >
          Add
        </button>
      )} */}
    </div>
  );
};

export default Toolbar;
