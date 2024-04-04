import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading3,
  Undo,
  Redo,
  Code,
} from "lucide-react";

const Toolbar = ({ editor }) => {
  const buttons = [
    {
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor?.isActive("bold"),
      icon: Bold,
      label: "Bold",
    },
    {
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor?.isActive("italic"),
      icon: Italic,
      label: "Italic",
    },
    {
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editor?.isActive("underline"),
      icon: Underline,
      label: "Underline",
    },
    {
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor?.isActive("heading"),
      icon: Heading3,
      label: "Heading 3",
    },
    {
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor?.isActive("bulletList"),
      icon: List,
      label: "Bullet List",
    },
    {
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor?.isActive("orderedList"),
      icon: ListOrdered,
      label: "Ordered List",
    },
    {
      action: () => editor.chain().focus().toggleCode().run(),
      active: editor?.isActive("code"),
      icon: Code,
      label: "Code",
    },
  ];

  if (!editor) {
    return null;
  }

  return (
    <div
      className="d-flex flex-wrap justify-content-evenly align-items-center p-2"
      style={{ backgroundColor: "var(--bg-soft)" }}
    >
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.preventDefault();
            button.action();
          }}
          disabled={button.disabled}
          className={`toolbarBtn ${
            button.active ? "bg-mid text-light" : "bg-transparent"
          }`}
        >
          <button.icon className="toolbarIcon" />
        </button>
      ))}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className={`toolbarBtn ${
          editor.isActive("undo") ? "bg-mid text-light" : "bg-transparent"
        }`}
      >
        <Undo className="toolbarIcon" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className={`toolbarBtn ${
          editor.isActive("redo") ? "bg-mid text-light" : "bg-transparent"
        }`}
      >
        <Redo className="toolbarIcon" />
      </button>
    </div>
  );
};

export default Toolbar;
