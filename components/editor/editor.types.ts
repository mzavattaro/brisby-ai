type EditorContentTypes = {
  type: string;
  content: ContentItem[];
};

type HeadingContent = {
  type: 'heading';
  attrs: {
    level: number;
  };
  content: TextContent[];
};

type ParagraphContent = {
  type: 'paragraph';
  content: (LinkContent | TextContent)[];
};

type ImageContent = {
  type: 'image';
  attrs: {
    src: string;
    alt: string;
    title: string;
  };
};

type TextContent = {
  type: 'text';
  text: string;
  marks?: Mark[];
};

type LinkContent = TextContent & {
  marks: LinkMark[];
};

type Mark = {
  type: string;
};

type LinkMark = Mark & {
  type: 'link';
  attrs: {
    href: string;
    target: string;
    class: string;
  };
};

type ContentItem = HeadingContent &
  ImageContent &
  LinkContent &
  ParagraphContent &
  TextContent;

export default EditorContentTypes;
