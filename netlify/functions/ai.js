const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  if (!process.env.OPENAI_API_KEY) return { statusCode: 503, headers, body: JSON.stringify({ error: 'AI is not configured. Add OPENAI_API_KEY to the server environment.' }) };

  try {
    const body = JSON.parse(event.body || '{}');
    const task = body.task || 'reply';
    const lead = body.lead || {};
    const instruction = body.instruction || '';

    const system = `You are Valo, an AI sales automation copilot. Your job is to help a business convert genuine enquiries into customers. Be concise, commercially useful, truthful and never invent pricing, guarantees, policies or facts. Keep a human in control of consequential actions. If drafting a customer reply, make it sound natural and specific to the enquiry. If scoring a lead, return a score from 0-100 and a short reason.`;
    const input = `Task: ${task}\nLead: ${JSON.stringify(lead)}\nAdditional instruction: ${instruction}`;

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
        instructions: system,
        input,
        max_output_tokens: 500,
      }),
    });

    const data = await response.json();
    if (!response.ok) return { statusCode: response.status, headers, body: JSON.stringify({ error: data?.error?.message || 'AI request failed' }) };
    return { statusCode: 200, headers, body: JSON.stringify({ text: data.output_text || '' }) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Unable to process AI request.' }) };
  }
};
