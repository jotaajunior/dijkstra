import { isAdjacent } from './utils/index.js'

export default class Dijkstra {
  constructor(graph) {
    /**
     * Primeiro, verifica se o existe um ponto de partida, caso
     * não exista dispara um erro
     */
    if (isAdjacent(graph)) {
      throw new Error(
        [
          'O formato do grafo não é válido.',
          'A entrada deve ser uma matriz adjacente.',
        ].join('\n')
      )
    }

    // Custo dos nós
    this.costs = graph[0]

    // Nós pais
    this.parents = {
      [graph.length - 1]: null,
    }

    // Nós já processados
    this.processed = []

    // O próprio grafo
    this.graph = graph

    // Adiciona os nós filhos do ponto de chegada
    for (let i = 0; i < graph.length; ++i) {
      this.parents[i] = 0
    }
  }

  /**
   * Retorna se o nó atual foi processado
   *
   * @param {string} node O nó
   * @returns {boolean}
   */
  wasProcessed(node) {
    return this.processed.includes(node)
  }

  /**
   * Obtém o nó mais "barato"
   *
   * @returns {string | null}
   */
  getCheapestNode() {
    // O nó mais barato
    let lowest = null

    /**
     * Percorre os nós verificando se ele é menor que
     * 'lowest', ao encontrar substitui lowest pelo nó
     */
    for (let i = 0; i < this.costs.length; ++i) {
      // O custo do nó atual
      const thisCost = this.costs[i]

      // O custo do menor nó
      const lowestCost = this.costs[lowest]

      if (lowest === null || thisCost < lowestCost) {
        if (!this.wasProcessed(i)) {
          lowest = i
        }
      }
    }

    return lowest
  }

  /**
   * Encontra o menor caminho
   */
  findPath() {
    // Obtém o nó mais barato
    let node = this.getCheapestNode()

    while (node !== null) {
      // O custo do nó atual
      const cost = this.costs[node]

      // Filhos do nó atual
      const childrens = this.graph[node]

      for (let i = 0; i < childrens.length; ++i) {
        // O custo para ir até o filho
        const childrenCost = childrens[i]

        // O novo custo calculado
        const newCost = cost + childrenCost

        /**
         * Caso o custo para esse nó ainda não tenha sido calculado
         * adiciona-o
         */
        const oldCost = this.costs[i]

        /**
         * Caso o custo do novo nó seja menor, o substitui
         * no registro de custos
         */
        if (newCost < oldCost) {
          this.costs[i] = newCost
          this.parents[i] = node
        }
      }

      // Adiciona o nó na lista dos nós já processados
      this.processed.push(node)

      // Repete o processo com o próximo nó mais barato
      node = this.getCheapestNode()
    }
  }

  /**
   * Obtém o caminho ótimo para o destino
   */
  getOptimalPath() {
    let optimalPath = [this.graph.length - 1]
    let parent = this.parents[this.graph.length - 1]

    while (parent) {
      // Adiciona o pai ao caminho ótimo
      optimalPath = [parent, ...optimalPath]

      // Prepara para próxima iteração
      parent = this.parents[parent]
    }

    return [0, ...optimalPath]
  }

  /**
   * Obtém o resultado do algoritmo
   *
   * @typedef {Object} Resultado
   * @property {number} distance
   * @property {array} path
   *
   * @returns {Resultado} O resultado
   */
  getResult() {
    this.findPath()

    return {
      distance: this.costs[this.graph.length - 1],
      path: this.getOptimalPath(),
    }
  }
}
