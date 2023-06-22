'use client';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import onChange from '@/lib/editorOnChange';
import TreeViewPlugin from './plugins/TreeViewPlugin';
import type { FC } from 'react';
import './TextEditor.css';

const theme = {
  /*
   * Theme styling goes here
   * ...
   */
};

/*
 * Catch any errors that occur during Lexical updates and log them
 * or throw them as needed. If you don't throw them, Lexical will
 * try to recover gracefully without losing user data.
 */
const onError = (error: Error) => {
  console.error(error);
};

const TextEditorOutput: FC = () => {
  const initialConfig = {
    namespace: 'MyEditor',
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="max-w-800 relative z-10 mx-auto bg-white text-black font-normal leading-5 text-left">
        <div className="editor-inner">
          <PlainTextPlugin
            contentEditable={
              <ContentEditable className="editor-input h-screen" />
            }
            placeholder={
              <div className="editor-placeholder">
                Generated notice will appear here...
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={onChange} />
          <HistoryPlugin />
        </div>
      </div>
      {process.env.NODE_ENV === 'development' ? <TreeViewPlugin /> : ''}
    </LexicalComposer>
  );
};

export default TextEditorOutput;
