const defaultEditorContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        { type: 'text', text: "Introducing BrisbyAI's notice generator" },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'The notice generator is a text editor with AI-powered autocompletion.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [{ type: 'text', text: 'Features' }],
    },
    {
      type: 'orderedList',
      attrs: { tight: true, start: 1 },
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Slash menu & bubble menu' }],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                { type: 'text', text: 'AI autocomplete (type ' },
                { type: 'text', marks: [{ type: 'code' }], text: '++' },
                {
                  type: 'text',
                  text: ' to activate, or select from slash menu)',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Save to noticeboard (select from slash menu)',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default defaultEditorContent;
