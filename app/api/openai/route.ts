import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { kv } from '@vercel/kv';
import { Ratelimit } from '@upstash/ratelimit';

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
  if (
    process.env.NODE_ENV !== 'development' &&
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  ) {
    const ip = req.headers.get('x-forwarded-for');
    const ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(10, '1 d'),
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(
      `brisbyAI_ratelimit_${ip ?? ''}`
    );

    if (!success) {
      return new Response('You have reached the monthly limit for your plan.', {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      });
    }
  }

  // Extract the `messages` from the body of the request
  const { messages } = (await req.json()) as Messages;

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
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
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    // eslint-disable-next-line id-length
    n: 1,
  });

  // Convert the response into a friendly text-stream
  // eslint-disable-next-line new-cap
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
