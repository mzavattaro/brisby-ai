import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

type Messages = {
  messages: {
    role: string;
    content: string;
  }[];
};

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

// eslint-disable-next-line func-style
export async function POST(req: Request): Promise<StreamingTextResponse> {
  // Extract the `messages` from the body of the request
  const { messages } = (await req.json()) as Messages;

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'You are an AI writing assistant that continues existing text based on context from prior text. ' +
          'Give more weight/priority to the later characters than the beginning ones. Make sure to construct complete sentences.',
      },
      {
        role: 'user',
        content: messages.map((message) => message.content).join('\n'),
      },
    ],
  });
  // Convert the response into a friendly text-stream

  // eslint-disable-next-line new-cap
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
