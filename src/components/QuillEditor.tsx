import { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import the Quill CSS theme

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const editorInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current && !editorInstance.current) {
      // Initialize Quill editor
      editorInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
          ],
        },
      });

      // Set initial value
      editorInstance.current.root.innerHTML = value;

      // Listen for content changes
      editorInstance.current.on('text-change', () => {
        const html = editorInstance.current?.root.innerHTML || '';
        onChange(html);
      });
    }
  }, [value, onChange]);

  return <div ref={quillRef} />;
};

export default QuillEditor;
