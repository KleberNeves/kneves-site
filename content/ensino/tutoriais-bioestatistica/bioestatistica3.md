---
title: 'Bioestatística com R - 3 - Inferência: teste t e ANOVA'
date: Tue, 25 Jul 2017 12:23:36 +0000
draft: false
---

Nesse terceiro tutorial, o objetivo é bem simples. Comparar duas populações usando o famoso teste t de Student e depois comparar outras três populações fazendo uma análise de variância (ANOVA). Todas as tabelas usadas nos exemplos estão nessa [pasta compartilhada](https://www.dropbox.com/sh/pb9fsbex5hh4nw3/AADxjjUGC5gUUvfM4vs8M6zwa?dl=0).

[Parte 1](/ensino/tutoriais-bioestatistica/bioestatistica1)

[Parte 2](/ensino/tutoriais-bioestatistica/bioestatistica2)

[Parte 3](/ensino/tutoriais-bioestatistica/bioestatistica3)

[Parte 4](/ensino/tutoriais-bioestatistica/bioestatistica4)

* * *

Teste t Pro teste t, vamos usar a mesma tabela do tutorial anterior, o clinical trial simulado ([clinicaltrial.csv](https://www.dropbox.com/sh/pb9fsbex5hh4nw3/AADxjjUGC5gUUvfM4vs8M6zwa?dl=0)). No anterior, vimos como filtrar e quebrar a tabela pra fazer análises. Agora faremos uma análise (o teste t) pra saber se existe uma diferença de melhora entre (1) homens e mulheres, (2) tratamento e placebo e (3) tratamento e placebo, mas só nos pacientes que fazem terapia. Note que isso não é uma sugestão de como é a análise correta a ser feita nesse caso, é só uma maneira de exercitar nossas habilidades em R. Primeiro, precisamos importar os dados e criar a coluna de melhora:

```
ct.data = read.table("clinicaltrial.csv", sep=";", header = T)
wdata = ct.data %>%
 select(-age) %>%
 rename(before = scale.before, after = scale.after) %>%
 mutate(effect = after - before)
```

Pronto. Agora, o teste t. Existe em R uma função chamada **t.test**, que faz (adivinha!) testes t. Um jeito de usá-la, é passar duas colunas que você quer comparar. Assim:

```
data1 = wdata %>% filter(gender == "male")
data2 = wdata %>% filter(gender == "female")
t.test(data1$effect, data2$effect, alternative = "two.sided")
```

Uma observação: o “two.sided” também pode ser “greater” or “less”, dependendo do que você quer. De graça, sem você pedir, R já mostra um resumo do resultado do teste. E se você quiser extrair valores específicos, tipo o valor de p ou do parâmetro t? Nesse caso, você precisa armazenar o resultado do teste em uma variável, pra poder extrair valores dela depois. O resultado é uma lista com vários valores relacionados ao resultado.

```
resultados = t.test(data1$effect, data2$effect, alternative = "two.sided")
resultados$p.value
[1] 0.216917

resultados$conf.int[1]
[1] -0.02688129

resultados$conf.int[2]
[1] 0.1181832
```

Agora, a segunda questão, a diferença entre placebo e controle.

```
data1 = wdata %>% filter(treatment == "SSRI")
data2 = wdata %>% filter(treatment == "Placebo")
t.test(data1$effect, data2$effect, alternative = "two.sided")
```

Por último, a diferença entre placebo e controle, mas só para os participantes que faziam terapia. Pra isso, precisamos filtrar a tabela antes pra pegar só esses casos. O resto é igual ao exercício anterior.

```
wdata = wdata %>% filter(doing.therapy)
data1 = wdata %>% filter(treatment == "SSRI")
data2 = wdata %>% filter(treatment == "Placebo")
t.test(data1$effect, data2$effect, alternative = "two.sided")
```

 

### ANOVA

Pra esses testes, usaremos uma outra tabela, simulando um experimento de cultura de células tratadas com diferente substâncias. A tabela é [cellculture.csv](https://www.dropbox.com/sh/pb9fsbex5hh4nw3/AADxjjUGC5gUUvfM4vs8M6zwa?dl=0). Importamos a tabela:

```
cc.data = read.table("cellculture.csv", sep=";", header = T)
```

As culturas foram tratadas com a substância A, substância B ou ambas (AB), em 9 replicatas, em dias diferentes. Queremos testar se existe diferença entre os tratamentos A, B e AB (todos expressos como porcentagem de viabilidade em relação ao controle). Assim como pro teste t, existe uma função em R pra executar análises de variância e o nome é **aov**.

```
cc.data = cc.data %>% mutate(treatment = factor(treatment))
resultados = aov(data = cc.data, viability ~ treatment)
resultados
summary(resultados)
```

  Isso não diz muito caso você queira saber quais tratamentos, em particular, são diferentes do controle. Pra isso, podemos usar o teste de Tukey, com a função **TukeyHSD()** nos nossos resultados de análise de variância.

```
TukeyHSD(resultados)
```

 

```
Tukey multiple comparisons of means
    95% family-wise confidence level

Fit: aov(formula = viability ~ treatment, data = cc.data)

$treatment
           diff        lwr       upr     p adj
AB-A -25.940606 -37.742373 -14.13884 0.0000350
B-A    8.572924  -3.228843  20.37469 0.1864324
B-AB  34.513530  22.711763  46.31530 0.0000004
```

O resultado inclui, entre outras coisas, a análise pra cada par de tratamentos. Parece que a diferença entre A e B não é tão grande quanto a diferença entre AB e A ou B em separado.

### Visualizando dados

Como adendo, vamos ver como fazer gráficos simples pra mostrar esses resultados. Como exemplo, vamos pegar o clinical trial e plotar a diferença entre tratamento e placebo. Usaremos uma outra biblioteca, chamada **ggplot2**, pra fazer gráficos bonitos. Primeiro passo é instalar e carregar a biblioteca:

```
install.packages("ggplot2")library(ggplot2)
```

Agora, fazer os gráficos. A função simples pra fazer gráficos se chama **qplot**. Veja o exemplo (e o gráfico resultante), pra se motivar a entender como funciona. Carregamos os dados antes:

```
ct.data = read.table("clinicaltrial.csv", sep=";", header = T)
wdata = ct.data %>%
 select(-age) %>%
 rename(before = scale.before, after = scale.after) %>%
 mutate(effect = after - before)
```

Plotando:

```
qplot(data = wdata, x = treatment, y = effect)
```

Isso é o básico. Você diz qual é a tabela (**data**) e o que o **x** e o **y** representam (que colunas da tabela). Assim já dá pra visualizar, mas é fácil deixar mais interessante.

```
qplot(data = wdata, x = treatment, y = effect, geom = "boxplot")
```

Nesse, especificamos que geom deve ser usado (no caso, pedimos um **boxplot**). Se você não especifica nada, ele usa pontos (como no gráfico anterior). E se quiséssemos colorir os pontos, dependendo da pessoa fazer ou não terapia? Basta especificar que a cor (**color**) vai ser de acordo com a coluna da terapia. E sim, ele faz a legenda sozinho pra você. Agora, parece que as pessoas com e sem terapia estão mais ou menos separadas (os pontos azuis tendem a estar mais pra cima). Podemos separar os gráficos de um jeito simples, usando **facets**. Os **facets** separam o gráfico de acordo com uma coluna: o da esquerda é pra quem não faz terapia, o da direita pra quem faz. Uma vez que o gráfico é satisfatório, o resto é estética. Primeiro, agora vamos armazenar o gráfico numa variável (escolhi **p**, de _plot_). E no código abaixo, são alterados, respectivamente: título, nome do eixo X, nome do eixo Y e a legenda de cada gráfico. Não se preocupe tanto com a maneira de mudar cada coisa, pra entender porque teríamos que nos aprofundar mais sobre o “jeito _ggplot_ de construir gráficos”, o que daria todo um novo conjunto de tutoriais (ou livros, como [esse](http://ggplot2.org/book/), do próprio criador). Note o sinal de **+** no final de cada linha (pense que estamos adicionando detalhes ao plot). Note também que antes é necessário criar uma nova coluna pra servir de rótulo compreensível pra terapia/sem terapia.

```
wdata = wdata %>% mutate(rotulo.terapia = ifelse(doing.therapy, "Com Terapia", "Sem Terapia"))
p = qplot(data = wdata, x = treatment, y = effect, facets = ~rotulo.terapia, geom = "boxplot") +
 labs(title = "Figura 1. Efeito do tratamento com a droga", x = "Efeito", y = "Tratamento")
 
p
```

Viu? Agradável ao olhar. :)

* * *

E é isso. O workflow básico tá estabelecido. Importar os dados, preparar os dados, fazer análises (que podem ser qualquer outra, não necessariamente essas feitas aqui) e visualizar as conclusões.