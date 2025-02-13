---
title: 'Bioestatística com R - 2 - Usando e manipulando tabelas'
date: Tue, 25 Jul 2017 12:19:42 +0000
draft: false
---

Nesse segundo tutorial, o foco é em importação e exportação de dados pra arquivos, além de como fazer as manipulações mais comuns nas suas tabelas: filtrar de acordo com critérios, criar, renomear e remover colunas, extrair resumos dos dados, entre outras coisas mais. Todas as tabelas usadas nos exemplos estão nessa [pasta compartilhada](https://www.dropbox.com/sh/pb9fsbex5hh4nw3/AADxjjUGC5gUUvfM4vs8M6zwa?dl=0).

  [Parte 1](/ensino/tutoriais-bioestatistica/bioestatistica1)

  [Parte 2](/ensino/tutoriais-bioestatistica/bioestatistica2)

  [Parte 3](/ensino/tutoriais-bioestatistica/bioestatistica3)

  [Parte 4](/ensino/tutoriais-bioestatistica/bioestatistica4)

* * *

### Importando e exportando dados

Vamos começar do que é mais direto. Digamos que você tem um conjunto de dados que quer salvar num arquivo. Pra fins de armazenamento de dados nesse tutorial, vamos usar arquivos **CSV** (_comma-separated values_, de valores separados por vírgulas). Esses arquivos são arquivos texto normais, onde cada linha do arquivo vira uma linha da tabela e as colunas são separadas por vírgulas (ou qualquer outro caractere, digamos, ponto-e-vírgula). Então, podemos criar um conjunto de dados arbitrário em R. Conjuntos de dados são armazenados em variáveis do tipo **data.frame**. Pra criar um, você pode usar vetores como colunas:

```
numeros = c(1,2,3)
letras = c("a","b","c")
uns.dados = data.frame(
 coluna1 = numeros,
 coluna2 = letras
)
uns.dados
```

Se tudo deu certo, apareceu uma tabelinha, de 3 linhas, com os dados, embaixo de cada coluna tem o tipo da coluna (**dbl** pra _double_, o termo para números não-inteiros, com decimais e **fctr** pra caracteres/strings). Agora, pra salvar esses dados:

```
write.table(df, "uns dados.csv", sep = ";", row.names = F)
```

De novo, tudo dando certo, deve existir um arquivo chamado uns dados.csv na mesma pasta do seu arquivo R. Quem fez tudo foi a função **write.table**. A primeira coisa que você passa pra função **write.table** é o seu **data.frame**. Em seguida, o nome do arquivo (pode colocar a pasta e o resto do caminho se quiser salvar em outra pasta). Depois **sep** indica o caractere que separa as colunas. O “normal” é usar vírgula mesmo, como diz o nome do arquivo. Mas aqui no Brasil, por exemplo, a vírgula é usada pra separar as casas decimais, o que pode confundir na hora de ler o arquivo (em inglês, usa-se o ponto, então não é problema). Por isso eu prefiro usar ponto-e-vírgula sempre que dá. O último argumento, **row.names**, está colocado como FALSE, só pra que R não numere as linhas (esse seria comportamento dessa função se você colocasse TRUE ou não dissesse nada). E se quisermos agora abrir o arquivo que acabamos de salvar? A lógica diria que existe uma função inversa, **read.table** que lê arquivos, mais ou menos nos mesmos moldes. O argumento **header** diz pra função que a primeira linha da tabela é o “cabeçalho”, contendo os nomes das colunas.

```
dados.lidos = read.table("uns dados.csv", sep = ";", header = T)
dados.lidos
```

E voilá. Você diz o nome e onde está o arquivo e qual o caractere que separa colunas e pronto! Agora faremos operações sobre os dados.

### Descrevendo os dados

Primeiro, a gente tem que usar o que vimos ainda agora pra obter dados mais interessantes do que esses inventados. A tabela que usaremos pode ser baixada [aqui](https://www.dropbox.com/sh/pb9fsbex5hh4nw3/AADxjjUGC5gUUvfM4vs8M6zwa?dl=0): **clinicaltrial.csv** Essa tabela tem dados inventados e simplificados sobre um clinical trial de uma droga pisquiátrica qualquer. Ele possui 6 colunas:

*   _gender_: masculino/feminino
*   _treatment_: grupo placebo ou droga ativa (SSRI - _Selective Serotonin Reuptake Inhibitor_ - uma classe de drogas psiquiátricas)
*   _age_: idade
*   _doing.therapy_: se a pessoa está ou não fazendo terapia ao mesmo tempo
*   _scale.before_: severidade do transtorno antes do tratamento, medida por uma escala
*   _scale.after_: severidade do transtorno ao final do tratamento, medida pela mesma escala

O objetivo aqui é aprender a extrair médias e medianas, desvios e variâncias, pra diferentes subgrupos. Tem umas coisas que precisamos saber antes. Primeiro, carregamos a tabela (lembre-se que pra funcionar, a tabela tem que estar na mesma pasta do notebook, senão você precisa dizer a pasta também, o caminho inteiro, e não só o nome do arquivo):

```
ct.data = read.table("clinicaltrial.csv", sep=";", header = T)
summary(ct.data)

```
A função **summary** dá um resumo da tabela, útil pra checarmos se saiu tudo direitinho. Por exemplo, são 297 mulheres e 324 homens, idades vão de 22 a 45 e o valor na escala antes do estudo varia de 4 a 10, com média 7,129. Agora, e se quisermos armazenar a média das idades em uma variável? Pra extrair uma coluna de uma tabela, usamos o símbolo **$**.Porexemplo, **ct.data$age** te dá a lista de valores da coluna **age**. E R possui uma função **mean()** que calcula médias (e várias outras).

```
mean(ct.data$age)
```

Nada muito diferente se quisermos a mediana, o desvio padrão ou a variância.

```
median(ct.data$age)
sd(ct.data$age)
var(ct.data$age)
```

### dplyr

Agora, pra complicar um pouco. E se quisermos a média de idade só pra mulheres? Pra esse tipo de tarefa, podemos proceder de alguns jeitos diferentes. Aqui, usaremos uma biblioteca chamada **dplyr**. Uma biblioteca é um pedaço de código em R, um conjunto de funções e outras coisas úteis que são agrupadas pra serem usadas como um pacote: **dplyr** contém funções pra manipulação de data.frames, em outro momento usaremos um outro pacote pra fazer gráficos, etc. Existem muitos muitos pacotes, pra coisas bem específicas e todo tipo de análise, feitos por pessoas de todo o planeta. Esse é um dos pontos fortes de R. Pra instalar **dplyr** (ou qualquer outra biblioteca):

```
install.packages("dplyr")
```

Uma vez instalado, sempre que for usar, você precisa importar a biblioteca (ignorem os avisos que vão aparecer):

```
library(dplyr)
```

O que **dplyr** nos dá é um operador novo e um conjunto de funções úteis. Por exemplo, as que usaremos hoje:

*   a função **mutate**, pra adicionar colunas;
*   a função **rename**, pra renomear colunas;
*   a função **filter**, pra selecionar só algumas linhas da tabela de acordo com critérios;
*   a função **select**, pra gerar uma nova tabela só com algumas colunas selecionadas;
*   a função **group_by**, pra separar uma tabela em subtabelas seguindo algum critério;
*   a função **summarise**, pra gerar medidas descritivas de conjuntos de dados (tipo média, desvio, etc);
*   o operador **%>%**, pra passar tabelas pras funções ou pegar o resultado de uma função e passar pra seguinte.

As descrições acima são só pra referência, veremos uma por uma agora.

### Manipulando dados

Voltemos ao problema anterior: queremos a média de idade das mulheres no estudo. Esse é um trabalho pra função **filter**. Veja uma maneira de usar:

```
mulheres = ct.data %>% 
 filter(gender == "female")
media.idade.mulheres = mean(mulheres$age)
media.idade.mulheres

[1] 33.74411
```

Intuitivo? Primeiro, criamos uma nova tabela, mulheres, que contém só as mulheres da tabela original. Isso é obtido com **dplyr**: os dados originais (**ct.data**) são passados (com **%>%**) pra função **filter**, que usa como critério o gênero (coluna **gender**) ser igual a (==) **“female”**. Depois é só calcular a média das idades, como antes. Legal. Mais complicado. E se quisermos a idade média das mulheres que faziam terapia? E das que não faziam? Tente você mesmo antes de ver como fazer abaixo (basta usar os operadores lógicos que vimos antes: E, OU, NÃO)

```
mulheres.terapia = ct.data %>% 
 filter(gender == "female" & doing.therapy)
mulheres.nao.terapia = ct.data %>% 
 filter(gender == "female" & !doing.therapy)


mean(mulheres.terapia$age)
[1] 33.93396

mean(mulheres.nao.terapia$age)
[1] 33.63874
```

Ok. Agora, digamos que estamos interessados só nas escalas, não mais na idade. Então quero uma tabela nova que não tenha a coluna de idade. Pra isso, a função select é o que queremos.

```
wdata = ct.data %>%
 select(gender,treatment,doing.therapy,scale.before,scale.after)
wdata = ct.data %>%
 select(-age)
names(wdata)
```

O que aconteceu acima: pra função **select**, você pode especificar que colunas quer manter ou que colunas quer remover (com o sinal de menos). A função **names** diz que colunas existem, só pra checar se deu certo. E o nome da variável é **wdata** de _working data_, os dados de trabalho, que estão em uso nesse momento (é só um nome que eu uso sempre quando falta um nome melhor). Agora, imagina que você não gosta dos nomes das colunas de escalas, quer mudar só pra **before** e **after**. Pra isso, a função **rename** existe.

```
wdata = ct.data %>%
  rename(before = scale.before, after = scale.after)
names(wdata)
```

Próxima etapa. Queremos uma coluna nova - **effect** -, que indique a melhora do paciente no período, medido pela escala, ou seja, o valor da escala depois menos o valor da escala antes. A função **mutate** faz isso (o nome é porque ela muda, transforma a forma da tabela):

```
wdata = wdata %>%
 mutate(effect = after - before)
```

Agora dá pra mostrar uma coisa que deixa **dplyr** muito mais divertida. Você pode encadear várias funções. O que fizemos em três partes acima, pode ser feito de uma vez só:

```
wdata = ct.data %>%
 select(-age) %>%
 rename(before = scale.before, after = scale.after) %>%
 mutate(effect = after - before)
```

O código acima é equivalente ao que fizemos antes. Agora a gente tem a tabela nova, podemos voltar a extrair médias (ou qualquer outra medida), como antes. Por exemplo, qual a melhora média das melhora média das mulheres que fazem terapia ou tinham a escala >= 8 antes do estudo?

```
subdata = wdata %>%
 filter(gender == "female" & (doing.therapy | before >= 8))
mean(subdata$effect)
```

Ótimo. Última coisa. Todos essas médias que calculamos pra subgrupos específicos podem ser feitas de um jeito mais interessante, usando as funções **group_by** e **summarise**. A ideia é quebrar a tabela em grupos de acordo com algumas colunas e calcular alguma coisa pra cada grupo, devolvendo os resultados já sumarizados numa tabela nova. Exemplo. Digamos que queremos a média da melhora pra cada sexo.

```
medias = wdata %>%
  group_by(gender) %>%
  summarise(media = mean(effect))
medias
```

O resultado é uma tabela nova, que contém uma coluna pro sexo e outra pro resultado da média, que criamos na função. E se quisermos, além de separar por sexo, saber também as médias pra grupos placebo/tratamento ativo? E se quisermos saber também o desvio padrão, além da média?

```
medias = wdata %>%
  group_by(gender, treatment) %>%
  summarise(media = mean(effect), desvio = sd(effect))
medias
```

Pronto. Nova tabela, com os resultados pra cada grupo.

* * *

É isso. Vimos como importar tabelas, usamos e abusamos de **dplyr** pra fazer o que quiser com os dados pra prepará-los pra análise (aqui só calculamos médias, mas vamos fazer algo mais sofisticado em breve).