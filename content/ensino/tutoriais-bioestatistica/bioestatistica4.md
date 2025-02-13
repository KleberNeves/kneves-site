---
title: 'Bioestatística com R - 4 - Correlação e Regressão'
date: Tue, 25 Jul 2017 12:24:12 +0000
draft: false
---

Esse é o último tutorial dessa introdução mínima a bioestatística com R. Vamos analisar correlações entre variáveis e fazer uma regressão. Todas as tabelas usadas nos exemplos estão nessa [pasta compartilhada](https://www.dropbox.com/sh/pb9fsbex5hh4nw3/AADxjjUGC5gUUvfM4vs8M6zwa?dl=0).

[Parte 1](/ensino/tutoriais-bioestatistica/bioestatistica1)

[Parte 2](/ensino/tutoriais-bioestatistica/bioestatistica2)

[Parte 3](/ensino/tutoriais-bioestatistica/bioestatistica3)

[Parte 4](/ensino/tutoriais-bioestatistica/bioestatistica4)
  
* * *

### Correlação

Pra começar, vamos importar duas tabelas novas. Uma possui dados sobre o tamanho do corpo de diferentes animais e a outra sobre longevidade de diferentes animais: [bodymass.csv e longevity.csv](https://www.dropbox.com/sh/pb9fsbex5hh4nw3/AADxjjUGC5gUUvfM4vs8M6zwa?dl=0)

```
body.size.data = read.table("bodymass.csv", sep=";", header = T)
longevity.data = read.table("longevity.csv", sep=";", header = T)
```

O primeiro passo é fundir as duas tabelas, pra conseguir uma tabela que tenha animais com seus respectivos tamanhos corporais e longevidades. Pra isso, existe a função merge. Mas antes, vale olhar as tabelas, pra saber como fazer isso.

```
head(body.size.data)
head(longevity.data)
```

A função **head** mostra as primeiras linhas de uma tabela. O problema aqui é o seguinte: a coluna **Species** da tabela de tamanhos contém o nome completo da espécie. Já na outra tabela, gênero e espécie estão separados. Mas pra função **merge** funcionar, ela precisa de colunas de mesmo nome nas duas tabelas, que é o que ela vai usar pra comparar e mesclar os dados. Pra isso, precisamos usar **mutate** pra fazer com que a coluna **Species** da tabela de longevidade contenha o nome completo.

```
library(dplyr)
longevity.data = longevity.data %>%
  mutate(Species = paste(Genus, Species, sep = " "))
```

A função **paste** serve pra “colar” várias sequências de caracteres (strings) em uma só, separadas por um caractere (nesse caso, um espaço). Agora, mesclamos as tabelas numa nova:

```
wdata = merge(body.size.data, longevity.data, by = "Species")
summary(wdata)
```

O resultado tem 666 espécies, mais do que suficiente pra usarmos aqui. Usando **ggplot**, podemos investigar visualmente a relação entre tamanho corporal e longevidade.

```
library(ggplot2)
qplot(data = wdata, x = log(Body.mass), y = Maximum.longevity..yrs.)
```

Note que transformamos o tamanho corporal, pra uma escala logarítmica. E finalmente, a correlação é calculada com a função **cor**.

```
cor(x = wdata$Body.mass, y = wdata$Maximum.longevity..yrs.,
  use = "pairwise.complete.obs")
[1] 0.3290608
```

O argumento **use** serve pra indicar o que fazer com valores que não estão na tabela (por exemplo, uma espécie que esteja faltando um valor de longevidade). Valores que estejam faltando são representados por **NA** em R (_not available_). Nesse caso, a ordem é usar só as linhas (observações) que possuam o par de valores completo.

### Regressão

Um passo além é fazer uma regressão linear. Saber qual a reta que melhor explica a relação entre as duas variáveis em questão. Pra isso, temos que rodar um modelo linear. A função é **lm**.

```
modelo = lm(data = wdata, Maximum.longevity..yrs. ~ Body.mass)
```

O lado esquerdo do **~**, na fórmula, indica a variável dependente. Do lado direito, a variável independente. Investigando o modelo, você descobre várias coisas:

```
modelo
summary(modelo)

Coefficients:
               Estimate Std. Error t value Pr(>|t|)    
(Intercept)     -1.3126     1.0939   -1.20    0.231    
log(Body.mass)   4.1120     0.1971   20.86   <2e-16 ***
```

Dá pra ver o valor de p e os coeficientes da reta, por exemplo. Agora, um detalhe. Na verdade plotamos o logaritmo da massa corporal. Então, vamos refazer o modelo com o logaritmo:

```
modelo = lm(data = wdata, Maximum.longevity..yrs. ~ log(Body.mass))
modelo
summary(modelo)
```

E a última coisa, pra fechar com chave de ouro. Mostrar a reta de regressão num plot. Sendo uma regressão linear, é bem fácil com **ggplot**:

```
p = qplot(data = wdata, x = log(Body.mass), y = Maximum.longevity..yrs.) +
 geom_smooth(method = "lm")
p
```

E voilá. A função **geom_smooth()** faz tudo pra você: roda o modelo (especificado como **lm**, como usamos antes), extrai os coeficientes e plota a reta, com o intervalo de confiança sombreado.

* * *

Espero que esses quatro tutoriais tenham servido pra quebrar o gelo em relação a usar R pra fazer análises simples. Que seja o início, primeiro passo pra análises mais complexas num futuro próximo, porque seria um desperdício não continuar se aprofundando em R, dá pra fazer muito mais do que eu mostrei aqui. Isso foi mesmo só pra facilitar uma transição, um começo. :)