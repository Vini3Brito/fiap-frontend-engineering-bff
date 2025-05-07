const express = require('express');
const router = express.Router();
const { askOpenAI } = require('../services/openaiService');

const defaultFofocas = [{"title":"Famosa participa de reality","slug":"famosa-participa-reality","description":"Confira quem aceitou o convite!","content":"Uma famosa cantora foi confirmada como participante da próxima temporada de um famoso reality show de talentos. A notícia pegou os fãs de surpresa, que mal podem esperar para ver a artista em uma nova faceta."},{"title":"Casamento surpresa no mundo das celebridades","slug":"casamento-surpresa-celebridades","description":"Veja quem disse sim inesperadamente!","content":"Um renomado ator surpreendeu a todos ao se casar de forma repentina com sua namorada de longa data. O casamento secreto foi realizado em uma cerimônia íntima, sem a presença da imprensa, deixando os fãs ansiosos por mais detalhes."},{"title":"Escândalo envolvendo influenciador","slug":"escandalo-influenciador","description":"Quais são as acusações?","content":"Um famoso influenciador digital está sendo alvo de polêmica após ser acusado por ex-funcionários de comportamento inadequado nos bastidores de seu canal. As acusações incluem tratamento desrespeitoso e exigências descabidas, gerando grande repercussão nas redes sociais."},{"title":"Atriz é flagrada com novo affair","slug":"atriz-flagrada-affair","description":"Quem é o sortudo conquistador?","content":"Uma conhecida atriz foi vista em clima de romance com um famoso empresário durante um jantar em um restaurante badalado. As fotos do casal rapidamente se espalharam nas redes sociais, levantando especulações sobre um possível novo relacionamento."},{"title":"Celebridade adota animal de estimação exótico","slug":"celebridade-adota-animal-estimacao","description":"Veja qual animal incomum foi escolhido!","content":"Uma famosa celebridade surpreendeu seus seguidores ao anunciar a adoção de um animal de estimação bastante incomum. O bichinho exótico já conquistou o coração da estrela, que compartilha momentos fofos ao lado do novo mascote em suas redes sociais."}]

router.get('/', async (req, res) => {
  try {
    const result = await askOpenAI();
    res.json(JSON.parse(result.answer));
  } catch (err) {
    console.error('Erro ao consultar o OpenAI: ', err)
  }
  res.json(defaultFofocas)
});

module.exports = router;
