import { $getRoot, $getSelection } from 'lexical';

type EditorState = {
  read: (callback: () => void) => void;
};

/*
 * When the editor changes, you can get notified via the
 * LexicalOnChangePlugin!
 */
const onChange = (editorState: EditorState): void => {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log('Selected text: ', selection?.getTextContent());
  });
};

export default onChange;
