# Dijkstra

Implementação do [Algoritmo de Dijkstra](https://pt.wikipedia.org/wiki/Algoritmo_de_Dijkstra) em JavaScript para a disciplina de Grafos.

## Utilização

### Entrada

Esse algortimo toma como entrada uma [Matriz de Adjacência](https://en.wikipedia.org/wiki/Adjacency_matrix) armazenada num arquivo.

> Para representar o não relacionamento entre 2 nós utilize o caractere `#`

A entrada deve seguir o seguinte formato:

```txt
T // Onde 'T' é o tamanho da matriz (TxT)
P D // Onde 'P' é o ponto de Partida e D o Destino
a b // Matriz de Adjacência
c d // Matriz de Adjacência
```

### Executando o algoritmo

```
node src/index.js "caminho/até/o/arquivo.txt"
```
