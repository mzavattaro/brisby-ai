'use client';

import { useRef, useState } from 'react';
import Input from '@/components/input';
import Button from '@/components/button';
import TextEditorOutput from './textEditorOutput';
import type { FC, FormEvent } from 'react';

const GeneratorForm: FC = () => {
  const messageInput = useRef<HTMLInputElement | null>(null);
  const [storedResponse, setStoredResponse] = useState<string[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = messageInput.current?.value;
    console.log('Sending message to edge function: ', message);

    if (message !== undefined) {
      setStoredResponse((prev) => [...prev, message]);
      if (messageInput.current !== null) {
        messageInput.current.value = '';
      }
    }

    if (!message) {
      return;
    }

    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
      }),
    });

    console.log('Edge function returned.');
    console.log(response);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();

    setStoredResponse((prev) => [...prev, message]);

    let currentResponse: string[] = [];
    const readStream = async () => {
      const { value, done: doneReading } = await reader.read();
      if (doneReading) {
        return;
      }
      const chunkValue = decoder.decode(value);
      currentResponse = [...currentResponse, chunkValue];
      await readStream();
    };
    await readStream();

    setStoredResponse((prev) => [
      ...prev.slice(0, -1),
      currentResponse.join(''),
    ]);
  };

  console.log('Response received: ', storedResponse);

  return (
    <>
      <div className="px-4 border-b">
        <form className="flex h-10 mb-4 items-center" onSubmit={handleSubmit}>
          <Input
            forwardRef={messageInput}
            ariaLabel="Generate notice"
            type="text"
            name="text"
            id="text"
            showLabel={false}
            placeholder="Fire alarm inspection notice..."
            className="w-full mr-4"
          />
          <Button variant="primary" type="submit">
            Generate
          </Button>
        </form>
      </div>

      <TextEditorOutput />
    </>
  );
};

export default GeneratorForm;
