'use client';

import { useChat } from 'ai/react';
import { toast } from 'sonner';
import Input from '@/components/input';
import Button from '@/components/button';
import TextEditorOutput from './textEditorOutput';
import type { FC } from 'react';

const GeneratorForm: FC = () => {
  const { messages, input, stop, isLoading, handleInputChange, handleSubmit } =
    useChat({
      api: '/api/openai',
      onFinish: () => toast.success('Your AI generated notice is ready!'),
      body: {
        temperature: 0.7,
      },
    });

  return (
    <>
      <div className="px-4 border-b">
        <form className="flex h-10 mb-4 items-center" onSubmit={handleSubmit}>
          <Input
            ariaLabel="Generate notice"
            type="text"
            name="text"
            id="text"
            showLabel={false}
            placeholder="Fire alarm inspection notice..."
            className="w-full mr-4"
            value={input}
            onChange={handleInputChange}
          />
          <Button variant="secondary" type="button" onClick={stop}>
            Stop
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            Generate
          </Button>
        </form>
      </div>

      {messages.map((message) => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.content}
        </div>
      ))}

      {/* <TextEditorOutput /> */}
    </>
  );
};

export default GeneratorForm;
