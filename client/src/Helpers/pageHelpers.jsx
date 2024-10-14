import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import anime from "animejs";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "video",
];
export const stripHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
export const animateLabel = (direction, name) => {
  anime({
    targets: `.teacher-form label[for=${name}], .teacher-update-form label[for=${name}], .login-form-container label[for=${name}], form label[for=${name}]`,
    translateX: direction === "in" ? 100 : 0,
    delay: anime.stagger(100),
    easing: "easeOutQuad",
  });
};
export const QuillEditor = ({ value, onChange, className, name }) => {
  return (
    <ReactQuill
      theme='snow'
      value={value}
      onChange={onChange}
      modules={quillModules}
      formats={quillFormats}
      className={className}
      onFocus={() => {
        animateLabel("in", name);
      }}
      onBlur={() => {
        animateLabel("out", name);
      }}
    />
  );
};
export const DropdownOptions = ({ options, name, value, onChange }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className='form-control'
    onFocus={() => {
      animateLabel("in", name);
    }}
    onBlur={() => {
      animateLabel("out", name);
    }}
  >
    {options.map((option) => (
      <option key={option} value={option}>
        {option || `Please select a ${name}`}
      </option>
    ))}
  </select>
);

export const FormField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}) => (
  <div className='mb-3'>
    <label htmlFor={name} className='form-label'>
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        rows={4}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => animateLabel("in", name)}
        onBlur={() => animateLabel("out", name)}
        className='form-control'
        placeholder={placeholder}
      />
    ) : type === "quill" ? (
      <QuillEditor
        theme='snow'
        value={value}
        onChange={onChange}
        name={name}
        className='quill-editor form-control'
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => animateLabel("in", name)}
        onBlur={() => animateLabel("out", name)}
        className='form-control'
        placeholder={placeholder}
      />
    )}
  </div>
);
export const Loader = () => (
  <div className='full-screen-loader'>
    <span className='loader'></span>
  </div>
);
