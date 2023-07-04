'use client';

import { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { useDebouncedCallback } from 'use-debounce';
import { useCompletion } from 'ai/react';
import { toast } from 'sonner';
import va from '@vercel/analytics';
import useLocalStorage from '@/lib/hooks/use-local-storage';
import { TiptapExtensions } from './extensions';
import { TiptapEditorProps } from './props';
import defaultEditorContent from './default-content';
import { EditorBubbleMenu } from './components';
import type { FC } from 'react';

const Editor: FC = () => {
  const [content, setContent] = useLocalStorage(
    'content',
    defaultEditorContent
  );
  const [saveStatus, setSaveStatus] = useState('Saved');

  const [hydrated, setHydrated] = useState(false);

  // I removed ansync here since there was no await
  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    setSaveStatus('Saving...');
    setContent(json);
    // Simulate a delay in saving.
    setTimeout(() => {
      setSaveStatus('Saved');
    }, 500);
  }, 750);

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: async (event) => {
      setSaveStatus('Unsaved');
      const { selection } = event.editor.state;
      const lastTwo = event.editor.state.doc.textBetween(
        selection.from - 2,
        selection.from,
        '\n'
      );
      if (lastTwo === '++' && !isLoading) {
        event.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        });
        // we're using this for now until we can figure out a way to stream markdown text with proper formatting: https://github.com/steven-tey/novel/discussions/7
        await complete(event.editor.getText());

        // complete(event.editor.storage.markdown.getMarkdown());
        va.track('Autocomplete Shortcut Used');
      } else {
        await debouncedUpdates(event);
      }
    },
    autofocus: 'end',
  });

  const {
    complete,
    completion: aiCompletion,
    isLoading,
    stop,
  } = useCompletion({
    id: 'novel',
    api: '/api/openai',
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error('You have reached your request limit for the day.');
        va.track('Rate Limit Reached');
      }
    },
    onFinish: (prompt, completion) => {
      editor?.commands.setTextSelection({
        from: editor.state.selection.from - completion.length,
        to: editor.state.selection.from,
      });
      toast.success('AI generation is complete!');
    },
    onError: () => {
      toast.error('Something went wrong.');
    },
  });

  const prev = useRef('');

  // Insert chunks of the generated text
  useEffect(() => {
    const diff = aiCompletion.slice(prev.current.length);
    prev.current = aiCompletion;
    editor?.commands.insertContent(diff);
  }, [isLoading, editor, aiCompletion]);

  useEffect(() => {
    /*
     * if user presses escape or cmd + z and it's loading,
     * stop the request, delete the completion, and insert back the "++"
     */
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || (event.metaKey && event.key === 'z')) {
        stop();
        if (event.key === 'Escape') {
          editor?.commands.deleteRange({
            from: editor.state.selection.from - aiCompletion.length,
            to: editor.state.selection.from,
          });
        }
        editor?.commands.insertContent('++');
      }
    };

    const mousedownHandler = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      stop();
      if (
        toast('BrisbyAI writing paused. Continue?', {
          action: {
            label: 'Yes',
            onClick: async () => complete(editor?.getText() ?? ''),
          },
          duration: Infinity,
        })
      ) {
        va.track('User Paused AI');
        console.log('User wants to continue');
      }
    };

    if (isLoading) {
      document.addEventListener('keydown', onKeyDown);
      window.addEventListener('mousedown', mousedownHandler);
    } else {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', mousedownHandler);
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', mousedownHandler);
    };
  }, [stop, isLoading, editor, complete, aiCompletion.length]);

  // Hydrate the editor with the content from localStorage.
  useEffect(() => {
    if (editor && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg"
    >
      <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {saveStatus}
      </div>
      {editor ? <EditorBubbleMenu editor={editor} /> : null}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
