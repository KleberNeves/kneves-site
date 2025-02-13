---
title: 'Bioestatística com R - 1 - R como Calculadora'
date: Tue, 25 Jul 2017 12:19:07 +0000
draft: false
---

Nesse primeiro tutorial, pra se acostumar com R e com o RStudio, a ideia é fazer contas e operações básicas. Nada de estatística por enquanto. Um passinho de cada vez (esse texto assume que você tem R e RStudio instalados e funcionando no seu sistema).    

[Parte 1](/ensino/tutoriais-bioestatistica/bioestatistica1)

[Parte 2](/ensino/tutoriais-bioestatistica/bioestatistica2)

[Parte 3](/ensino/tutoriais-bioestatistica/bioestatistica3)

[Parte 4](/ensino/tutoriais-bioestatistica/bioestatistica4)

### Notebooks

Primeira coisa é abrir o **RStudio** e criar um notebook (_File > New File > R Notebook_).

Notebooks são arquivos em que você pode misturar texto formatado e de exposição com código em R, executável. É ideal pra registrar as suas análises de um modo reprodutível. Você pode criar explicações entre os trechos de código, assim o resultado é o código funcional e já documentado, ótimo pra relatar a análise pra outras pessoas (e pra fazer tutoriais).

Pronto, notebook criado. Ele já contém algum texto, explicando o básico de como usar um notebook. O que você precisa saber agora é que qualquer código tem que estar dentro de um bloco de código. Pra inserir um bloco de código, o atalho é _Ctrl + Alt + I._

Apague o conteúdo que já veio no arquivo - exceto as 4 primeiras linhas, que especificam o título e o output. Mude o título como preferir (lembre que ele deve estar entre aspas).

### R como Calculadora

Agora crie o primeiro bloco de código com o atalho (_Ctrl + Alt + I_). Digite o código abaixo no bloco de código criado.

```
# Variável a
a = 5
a
```

Ele deve mostrar **[1] 5**. O que essas duas linhas de código fizeram?

```
a = 5
```

Cria uma variável a e armazena o valor 5 nela. Uma observação importante: o símbolo de igual = e a setinha pra esquerda <- são equivalentes em R. Significam algo como “armazene a coisa à direita na coisa à esquerda”.

```
a
```

Isso faz com que o R te mostre o valor de a, que no caso é 5, porque fizemos isso na linha de cima.

```
# Variável a
```

Essa linha não faz nada. Como ela começa por **#**, ela é um comentário. Comentários (qualquer linha iniciada por **#**) são ignorados pelo R, só servem pra nós, humanos. Comentar o seu código de maneira informativa é um excelente hábito pra um programador. Primeiro, pra ajudar outras pessoas que venham a ler e tentar entender o seu código. Segundo, pra você mesmo se entender … não importa o quão claro e auto-explicativo seja o seu código, se você ficar dois dias sem vê-lo você vai esquecer o que estava pensando na hora.

Ok. Então você sabe como criar variáveis. Agora, façamos operações com elas.

```
# Operações
b = 3
c = a + b
c
```

Bom, tente adivinhar o que isso vai mostrar.

A resposta é 8. Coisas importantes aqui: (1) R não esquece facilmente. O valor de **a** que atribuímos antes ainda está lá. (2) Operações funcionam como se imaginaria. As quatro básicas são +, -, * e /. (3) Experimente. Veja os exemplos abaixo.

```
# Operações básicas
a * 5
[1] 25

b + 10
[1] 13

c / 2
[1] 4

c / 3
[1] 2.666667

2 * (a + b + c - 1)
[1] 30

# Potência
a ^ 2 # 5 ao quadrado
[1] 25
```

R não se limita a operações aritméticas básicas, é claro. Você também pode aplicar funções, várias já existem em R sem você precisar fazer nada.

```
cos(360)
[1] -0.2836911

cos(2*pi)
[1] 1

tan(pi/4)
[1] 1

log(10)
[1] 2.302585

log10(10)
[1] 1
```

Note que: (1) cosseno de 360 não é 1 … Por que? R assume que você está dizendo ângulos em radianos, não em graus. (2) Teste calcular o seno de pi radianos (180º) ou a tangente de pi/2 radianos (90º). Tente entender o que significa o resultado. (3) A função **log()** usa como base a constante de Euler (**e**). Pra calclular com base 10, exsite outra função: **log10()**.

### Juros compostos

Podemos tentar fazer coisas mais sofisticadas agora. Digamos que você tem um problema clássico de livro-texto, sobre juros compostos.

Você recebeu R$ 10.000,00 e investiu num fundo com rendimento de 5% ao ano, por 10 anos. Qual a soma total no final dos 10 anos?

```
inicial = 10000 # R$ 10.000,00
juros = 5 / 100 # 5%
tempo = 10 # 10 anos
final = inicial * (1 + juros) ^ tempo
final

[1] 16288.95
```

E se for por 20 anos? E se começar com metade do dinheiro? E se os juros triplicarem? A graça é que agora basta mudar uma linha do código acima pra chegar no novo resultado.

### Outros tipos de variáveis

Além de números, variáveis em R também podem armazenar caracteres e palavras (além de objetos mais complexos, como tabelas e dados ... mas fica pra depois). Esses caracteres, do tipo **string**, são sempre colocados entre aspas:

```
palavra = "tutorial"
palavra

[1] "tutorial"
```

Outro tipo importante é o tipo lógico. Variáveis desse tipo só podem ter dois valores: **TRUE** ou **FALSE** (também pode ser **T** e **F**). E eles tem as próprias operações. Por exemplo, imagine duas variáveis:

         _chuva:_ que diz se está chovendo

         _guardachuva:_ se eu tenho um guarda-chuva molhado: diz se eu vou ficar molhado

Eu só fico molhado se estiver chovendo E se eu NÃO tiver guarda-chuva. Ou, em outras palavras, eu fico seco (NÃO molhado) se NÃO estiver chovendo OU se eu tiver guarda-chuva.

Agora, em R, o símbolo **&** representa E, o símbolo **|** representa OU e o símbolo **!** representa NÃO.

Expresso em R, isso fica assim:

```
chuva = TRUE
guardachuva = FALSE
molhado = chuva & !guardachuva
seco = !chuva | guardachuva
molhado

[1] TRUE
```

Teste mudar os valores de chuva e guardachuva pra ver se ficamos molhados ou secos.

### Vetores

Uma última coisa, pra começarmos a entender a graça de R.

Além de variáveis que armazenam um único valor (seja ele um valor numérico, string/caracteres ou lógico ou qualquer coisa), também existem variáveis que armazenam conjuntos de valores. Existem vários tipos de “conjuntos”, mas por enquanto falaremos só dos vetores, que armazenam vários objetos do mesmo tipo (qualquer tipo, desde que todos do mesmo).

Vetores são criados com a função **c()** (_c_ de combine). Exemplos:

```
v = c(1,2,3)
w = c(a,b,s)
sudeste = c("RJ","SP","ES","MG")
logicos = c(TRUE,FALSE,FALSE,TRUE,FALSE)
```

Bem legal e tal ... mas e daí? E daí que você pode fazer operações em vetores. Qualquer coisa que você faz em um objeto único, isolado, você pode fazer em vetores. R entende, em geral, que você quer fazer aquilo com cada um dos elementos do vetor.

Por exemplo. Digamos que eu tenho vários números que eu quero elevar ao quadrado. Podemos fazer como antes:

```
n1 = 3
n2 = 20
n3 = 5

n1 ^ 2
n2 ^ 2
n3 ^ 2

[1] 9
[2] 400
[3] 25
```

Legal. E usando um vetor?

```
n = c(3,20,5)
n ^ 2

[1] 9 400 25
```

Problema: na minha pequena empresa eu tenho 3 funcionários, que ganham R$ 2000, R$ 1500 e R$ 1200. Quero dar um aumento de 10% pra cada um. Quanto vou pagar de salário com esse aumento?

```
salarios = c(2000,1500,1200)
salarios.com.aumento = salarios * 1.1
salarios.com.aumento

[1] 2200 1650 1320
```

Temos os salários pós-aumento. Mas e se eu quiser a soma deles? Bom, como são só três, você poderia fazer de cabeça ou no papel. Mas, a proposta aqui é exatamente deixar o R fazer isso por você. Convenientemente, existe uma função que soma todos os valores de um vetor, o nome é **sum(vetor)**.

(PARÊNTESES SOBRE FUNÇÕES: funções recebem alguma informação sua e devolvem outra. A informação recebida é o conjunto de argumentos da função, que vem entre aprênteses depois do nome. É exatamente como no seno e cosseno ou log. A função **sin(angulo)** recebe um número, que ela interpreta como um ângulo em radianos e retorna o valor do seno desse ângulo. Ela recebe um número e retorna um número. A função **sum(vetor)** é um pouco diferente. Ela recebe um vetor de números e retorna um número (a soma dos números contidos no vetor). E existem inúmeras outras funções muito mais complicadas que essas e você pode criar as suas próprias funções também! Em outro momento …)

Então, parênteses fechado, você pode saber o total rapidamente:

```
total = sum(salarios.com.aumento)
total

[1] 5170
```

E a diferença entre o gasto antes e depois do aumento?

```
diferenca = sum(salarios.com.aumento) - sum(salarios)
diferenca

[1] 470
```

Última coisa. Imagina que você quer saber quantos dos funcionários ganharão mais do que dois salários mínimos após o aumento.

```
salario.minimo = 937
ganham.mais = salarios.com.aumento > salario.minimo * 2
ganham.mais
[1] TRUE FALSE FALSE
```

O resultado é TRUE, FALSE, FALSE. Quer dizer que R já fez as comparações, uma por uma, e reportou. E só um dos funcionários (o primeiro) ganhará mais do que dois salários mínimos.

* * *

Espero que isso dê uma amostra do que dá pra fazer com R. Especialmente esse final, a naturalidade com que R faz operações com vetores, é importante pra R ser útil e divertido.