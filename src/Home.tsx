import { TextEditor } from './components/text-editor/TextEditor';

export function Home() {
  return (
    <div
      style={{
        width: '500px',
        padding: '20px',
        margin: '0 auto',
      }}
    >
      <TextEditor />
    </div>
  );
}
