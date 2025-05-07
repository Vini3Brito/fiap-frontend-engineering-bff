const axios = require('axios');

async function askOpenAI() {
  const prompt = `Invente 5 títulos de fofocas sobre celebridades atuais, um "slug" à ser utilizado como parte da URL, uma breve descrição  (máximo 100 caracteres) e o conteúdo completo da fofoca (máximo 500 caracteres). Retorne um JSON no formato [{title, slug, description, content}]. Não adicione quebras de linhas.`;

  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'Não gere nenhum conteúdo ofensivo ou cite pessoas reais.' },
      { role: 'user', content: prompt }
    ]
  }, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    }
  });

  const message = response.data.choices[0].message.content.trim();

  return {
    answer: message,
    timestamp: new Date().toISOString()
  };
}

module.exports = { askOpenAI };
