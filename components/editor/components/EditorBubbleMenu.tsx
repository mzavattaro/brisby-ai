import { BubbleMenu } from '@tiptap/react';
import { useState } from 'react';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
} from 'lucide-react';

import { clsx } from '@/lib/clsx';
import NodeSelector from './node-selector';
import { ColorSelector } from './color-selector';
import type { FC } from 'react';
import type { BubbleMenuProps } from '@tiptap/react';

export type BubbleMenuItem = {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: typeof BoldIcon;
};

type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children'>;

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const { editor } = props;
  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);

  const items: BubbleMenuItem[] = [
    {
      name: 'bold',
      isActive: () => editor.isActive('bold'),
      command: () => editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: () => editor.isActive('italic'),
      command: () => editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: 'underline',
      isActive: () => editor.isActive('underline'),
      command: () => editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'strike',
      isActive: () => editor.isActive('strike'),
      command: () => editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: 'code',
      isActive: () => editor.isActive('code'),
      command: () => editor.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ editor }) => {
      // don't show if image is selected
      if (editor.isActive('image')) {
        return false;
      }
      return editor.view.state.selection.content().size > 0;
    },
    tippyOptions: {
      moveTransition: 'transform 0.15s ease-out',
      onHidden: () => {
        setIsNodeSelectorOpen(false);
        setIsColorSelectorOpen(false);
      },
    },
  };

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="flex overflow-hidden rounded border border-stone-200 bg-white shadow-xl"
    >
      <NodeSelector
        editor={editor}
        isOpen={isNodeSelectorOpen}
        setIsOpen={() => {
          setIsNodeSelectorOpen(!isNodeSelectorOpen);
          setIsColorSelectorOpen(false);
        }}
      />

      {items.map((item, index) => (
        <button
          type="button"
          key={index}
          onClick={item.command}
          className="p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200"
        >
          <item.icon
            className={clsx('h-4 w-4', item.isActive() && 'text-blue-500')}
          />
        </button>
      ))}
      <ColorSelector
        editor={editor}
        isOpen={isColorSelectorOpen}
        setIsOpen={() => {
          setIsColorSelectorOpen(!isColorSelectorOpen);
          setIsNodeSelectorOpen(false);
        }}
      />
    </BubbleMenu>
  );
};
