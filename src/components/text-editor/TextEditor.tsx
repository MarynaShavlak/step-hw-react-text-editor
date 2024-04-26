import { Bold, Eraser, Italic, Underline } from 'lucide-react';
import styles from './TextEditor.module.scss';
import { useRef, useState } from 'react';
import { TStyle, textFormat } from './text-format';
import parse from 'html-react-parser';

export function TextEditor() {
  const [text, setText] = useState(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate consequuntur aperiam facere omnis assumenda, id praesentium libero atque quos velit error rem voluptas, necessitatibus soluta autem nisi nihil. Ab, ducimus!',
  );

  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  const textRef = useRef<HTMLTextAreaElement | null>(null);

  const updateSelection = () => {
    if (!textRef.current) return;
    setSelectionStart(textRef.current.selectionStart);
    setSelectionEnd(textRef.current.selectionEnd);
  };

  const getSelectionText = (type: TStyle) => {
    const selectedText = text.substring(selectionStart, selectionEnd);
    if (!selectedText) return;

    const before = text.substring(0, selectionStart);
    const after = text.substring(selectionEnd);
    setText(before + textFormat(type, selectedText) + after);
  };

  const handleClearText = () => {
    setText('');
  };
  return (
    <div>
      <h1 className={styles.title}>Text editor</h1>
      <div className={styles.card}>{parse(text)}</div>
      <div className={styles.card}>
        <textarea
          ref={textRef}
          className={styles.editor}
          onSelect={updateSelection}
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>

        <div className={styles.action}>
          <div className={styles.tools}>
            <button onClick={handleClearText}>
              <Eraser size={16} />
            </button>
            <button onClick={() => getSelectionText('bold')}>
              <Bold size={16} />
            </button>
            <button onClick={() => getSelectionText('italic')}>
              <Italic size={16} />
            </button>
            <button onClick={() => getSelectionText('underline')}>
              <Underline size={16} />
            </button>
          </div>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}
