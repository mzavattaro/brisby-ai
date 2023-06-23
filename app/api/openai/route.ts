import openAIStream from '@/lib/openAIStreaming';
import type { OpenAIStreamPayload } from '@/lib/openAIStreaming';
import type { NextApiHandler } from 'next';

type RequestData = {
  currentModel: string;
  message: string;
};

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI');
}

export const runtime = 'edge';

const handler: NextApiHandler = async (request) => {
  const { message } = (await request.json()) as RequestData;

  if (!message) {
    return new Response('No message in the request', { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2048,
    stream: true,
    // eslint-disable-next-line id-length
    n: 1,
  };

  const stream = await openAIStream(payload);
  return new Response(stream);
};

export default handler;
