import { createParser } from 'eventsource-parser';
import type { ParsedEvent, ReconnectInterval } from 'eventsource-parser';

export type ChatGPTAgent = 'system' | 'user';

export type ChatGPTMessage = {
  role: ChatGPTAgent;
  content: string;
};

export type OpenAIStreamPayload = {
  model: string;
  messages: ChatGPTMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
};

type OpenAIResponse = {
  id: string;
  object: string;
  created: number;
  choices?: {
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason: string | null;
    index: number;
  }[];
  model: string;
};

const OpenAIStream = async (payload: OpenAIStreamPayload) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const { data } = event;

          if (data === '[DONE]') {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data) as OpenAIResponse;

            if (!json.choices) {
              return;
            }

            const text = json.choices[0].delta.content;

            if (!text) {
              return;
            }

            if (counter < 2 && !text.trim().length) {
              return;
            }

            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter += 1;
          } catch (error) {
            controller.error(error);
          }
        }
      };

      /*
       * stream response (SSE) from OpenAI may be fragmented into multiple chunks
       * this ensures we properly read chunks and invoke an event for each SSE event stream
       */
      const parser = createParser(onParse);
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of response.body as unknown as BufferSource[]) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
};

export default OpenAIStream;
