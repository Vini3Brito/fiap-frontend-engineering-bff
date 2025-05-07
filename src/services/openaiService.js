const axios = require('axios');

const defaultFofocas = [{"title":"Famosa participa de reality","slug":"famosa-participa-reality","description":"Confira quem aceitou o convite!","content":"Uma famosa cantora foi confirmada como participante da próxima temporada de um famoso reality show de talentos. A notícia pegou os fãs de surpresa, que mal podem esperar para ver a artista em uma nova faceta."},{"title":"Casamento surpresa no mundo das celebridades","slug":"casamento-surpresa-celebridades","description":"Veja quem disse sim inesperadamente!","content":"Um renomado ator surpreendeu a todos ao se casar de forma repentina com sua namorada de longa data. O casamento secreto foi realizado em uma cerimônia íntima, sem a presença da imprensa, deixando os fãs ansiosos por mais detalhes."},{"title":"Escândalo envolvendo influenciador","slug":"escandalo-influenciador","description":"Quais são as acusações?","content":"Um famoso influenciador digital está sendo alvo de polêmica após ser acusado por ex-funcionários de comportamento inadequado nos bastidores de seu canal. As acusações incluem tratamento desrespeitoso e exigências descabidas, gerando grande repercussão nas redes sociais."},{"title":"Atriz é flagrada com novo affair","slug":"atriz-flagrada-affair","description":"Quem é o sortudo conquistador?","content":"Uma conhecida atriz foi vista em clima de romance com um famoso empresário durante um jantar em um restaurante badalado. As fotos do casal rapidamente se espalharam nas redes sociais, levantando especulações sobre um possível novo relacionamento."},{"title":"Celebridade adota animal de estimação exótico","slug":"celebridade-adota-animal-estimacao","description":"Veja qual animal incomum foi escolhido!","content":"Uma famosa celebridade surpreendeu seus seguidores ao anunciar a adoção de um animal de estimação bastante incomum. O bichinho exótico já conquistou o coração da estrela, que compartilha momentos fofos ao lado do novo mascote em suas redes sociais."}]

async function askOpenAI() {
  const prompt = `Invente 5 títulos de fofocas sobre celebridades atuais, um "slug" à ser utilizado como parte da URL, uma breve descrição  (máximo 100 caracteres) e o conteúdo completo da fofoca (máximo 500 caracteres). Retorne um JSON no formato [{title, slug, description, content}]. Não adicione quebras de linhas.`;

  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'Não gere nenhum conteúdo ofensivo ou cite pessoas reais.' },
      { role: 'user', content: prompt }
    ]
  }, {
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    }
  }).catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    return {
      answer: defaultFofocas,
      timestamp: new Date().toISOString()
    }
  });

  const message = response.data.choices[0].message.content.trim();

  return {
    answer: message,
    timestamp: new Date().toISOString()
  };
}

module.exports = { askOpenAI };
