import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";

const Tiptap = ({ onChange, content }) => {
  const handleChange = (newContent) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class: "p-3",
        spellcheck: true,
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-2 border-secondary position-relative content overflow-hidden">
      <EditorContent
        editor={editor}
        style={{
          whiteSpace: "pre-line",
        }}
      />
      <hr className="my-0" />
      <Toolbar editor={editor} content={content} className="toolbar" />
    </div>
  );
};

export default Tiptap;
