# Dijkstra

Implementação do [Algoritmo de Dijkstra](https://pt.wikipedia.org/wiki/Algoritmo_de_Dijkstra) em JavaScript para a disciplina de Grafos.

## Utilização

### Definindo o grafo

- O nó de partida deve se chamar `partida`
- O nó de chegada deve se chamar `chegada`
- O arquivo deve estar no formato `.json`

A definição de um nó deve seguir o seguinte formato:

```json
{
  "nó": {
    "vizinho1": 8,
    "vizinho2": 3
  }
}
```

Onde e `vizinho1` e `vizinho2` são nós de vizinho de `nó` com custo de `8` e `3` respectivamente.

### Executando o algoritmo

```
node src/index.js "caminho/até/o/arquivo.json"
```
