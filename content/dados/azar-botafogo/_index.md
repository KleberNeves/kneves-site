---
author: kleberneves
date: "2021-02-18T19:18:21+00:00"
title: O azar do Botafogo

---

O imaginário do futebol é cheio de fenômenos inevitáveis e inexplicáveis. Por exemplo, nunca dê como vencido o Palmeiras no Allianz Parque ou o Real Madrid em noite de Champions League - mesmo nos acréscimos e perdendo por dois gols de diferença. Times argentinos na Libertadores vão ser favorecidos pela arbitragem - o que vai levar a cenas lamentáveis no fim dos jogos. O Internacional (e às vezes, o Vasco) vai ser vice. O Manchester United vai fazer um gol no *"Fergie time"*.

Outro truísmo é que “tem coisas que só acontecem ao Botafogo”.

A frase é do jornalista Paulo Mendes Campos, de uma crônica de 1962, intitulada [“O Botafogo e eu”](https://www.uol.com.br/esporte/colunas/pvc/2023/11/02/ha-coisas-que-so-aconteceu-ao-botafogo-frase-nasceu-com-botafogo-campeao.htm). Botafoguenses já sabiam, mas muita gente descobriu a verdade dessa frase em 2023, quando o drama do time da estrela solitária bateu recordes e furou a bolha. Mas muitos torcedores do Botafogo [nunca acreditaram realmente que o time ia ganhar](kneves Stephan nercessiam) ainda que a fase fosse ótima ou que deixar escapar um resultado parecesse improvável em algum jogo. Se muito, acreditaram cautelosamente, como o gato escaldado do provérbio - eu acreditei por menos de 1h, entre o 3x0 e o segundo gol do Endrick.

Claro que essas regras são cheias de exceções. O viés de confirmação e a nossa memória seletiva cuidam para que a gente fique com a impressão de que o Botafogo é sempre azarado, que não pode ser só coincidência - apesar dos jogadores, comissões técnicas e circunstâncias diferentes ao longo dos anos.

Mas deixando as impressões de lado, o Botafogo é realmente azarado?

Em 2023, é difícil não concluir que sim. O Botafogo terminou o Brasileirão na 5ª posição, depois de chegar a liderar o campeonato com 13 pontos de vantagem para o segundo colocado. Isso por si só já bastaria, mas é um evento único, isolado. O requinte de crueldade veio na maneira como os jogos do Botafogo se desenrolaram. Nas últimas XX rodadas, foram XX jogos onde o Botafogo começou vencendo e não saiu com a vitória, além de XX pontos perdidos com gols sofridos depois dos 40 minutos do segundo tempo. Era impossível ficar tranquilo torcendo, mesmo ganhando, mesmo faltando pouco tempo.

Mas será que isso só acontece com o Botafogo? Para tentar descobrir, resolvi analisar o azar futebolístico por essas duas métricas: em que porcentagem dos seus jogos o time chega a estar vencendo mas no final não sai com a vitória? Qual a porcentagem de pontos que o time perde com gols sofridos após os 40 minutos do segundo tempo?

{{< figure
  src="plot_2023.png"
  alt="Botafogo 2023"
  class="std-figure"
>}}

Quanto mais pra direita um time está no gráfico, mais pontos ele perde depois dos 40. E quanto mais pra cima, mais vezes ele abre 2 gols de vantagem e não sai com a vitória. Então um time muito azarado vai aparecer no canto superior-direito, o que significa que as duas coisas acontecem com frequência - digamos que é o “quadrante dos azarados”, contendo os times acima da média nesses dois aspectos trágicos. Por essas métricas, os times mais azarados do Brasileirão de 2023 foram, de longe, o Botafogo e o América-MG - que terminou o campeonato rebaixado, na lanterna.

Então parece que essa medida de azar funciona, no sentido de que ela captura a opinião geral de que o Botafogo teve muito azar na reta final do campeonato do ano passado. O 2023 do Botafogo serve pra calibrar a análise: uma métrica de azar que dissesse que o 2023 do Botafogo não foi azarado seria    uma métrica ruim.

E se aplicarmos a mesma medida de azar para toda a era dos pontos corridos (i.e. todos os campeonatos brasileiros desde 2003)? Para ser uma comparação justa, vamos olhar apenas os times que fizeram pelo menos 380 jogos (ou 10 temporadas) na Série A nesse período. E estou excluindo 2023, pois aumentaria muito o azar do Botafogo - vamos ver se o Botafogo tem essa tendência de ceder empates, viradas e gols no final mesmo sem contar o ápice do azar que foi 2023.

{{< figure
  src="plot_2003-2023.png"
  alt="Botafogo 2003-       2023"
  class="std-figure"
>}}

O Botafogo ainda se destaca no quadrante do azar (junto com Vasco e o Goiás - o que não deve ser grande surpresa para os respectivos torcedores).

Quer dizer, o 2023 do Botafogo é uma versão extrema do que foi o acumulado dos últimos 20 anos: o time tende a ceder empates e viradas e sofrer gols no fim dos jogos, mais do que os outros times. O botafoguense então está completamente justificado em sua desconfiança (e se somar 2023, aí nem se fala).

Não sei como era o dia-a-dia do torcedor do Botafogo de décadas passadas - e fica mais difícil fazer essa mesma análise porque os dados de temporadas antigas são escassos -, mas nesse século, dentre os times que disputam regularmente a Série A do Brasileirão, acho que é seguro dizer que o Botafogo é o time cujo torcedor tem mais razão para ficar inseguro. Esse histórico explica ficar nervoso no jogo de volta contra o Peñarol mesmo com a goleada do jogo de ida. Superstição baseada em evidências. Mas deu tudo certo no final.
