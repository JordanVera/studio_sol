import {z} from 'zod';

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().email().max(150),
  occasion: z.string().max(100),
  date: z.string().max(20),
  message: z.string().min(10).max(4000),
  arrangement: z.string().max(120).optional(),
  website: z.string().optional(),
});

export async function POST(req: Request) {
  if (
    req.headers.get('origin') &&
    req.headers.get('origin') !== new URL(req.url).origin
  ) {
    return Response.json({message: 'Invalid request.'}, {status: 403});
  }
  const result = schema.safeParse(await req.json().catch(() => null));
  if (!result.success) {
    return Response.json(
      {message: 'Please check your name, email, and message.'},
      {status: 400},
    );
  }
  if (result.data.website) return Response.json({message: 'Thank you.'});
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.CONTACT_TO_EMAIL ||
    !process.env.CONTACT_FROM_EMAIL
  ) {
    return Response.json(
      {
        message:
          'This sample studio is not accepting messages yet. Email delivery must be connected before inquiries can be sent.',
      },
      {status: 503},
    );
  }
  const d = result.data;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      reply_to: d.email,
      subject: `Flower inquiry: ${d.occasion}`,
      text: `Name: ${d.name}\nEmail: ${d.email}\nOccasion: ${d.occasion}\nArrangement: ${d.arrangement || '—'}\nDate: ${d.date}\n\n${d.message}`,
    }),
  });
  return Response.json(
    {
      message: r.ok
        ? 'Thank you! Your note is on its way. We’ll reply soon.'
        : 'Your message could not be sent. Please try again or call us.',
    },
    {status: r.ok ? 200 : 502},
  );
}
