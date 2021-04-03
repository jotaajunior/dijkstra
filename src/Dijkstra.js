import { has } from './utils/index.js'
import { START_KEY, FINISH_KEY } from './consts.js'

export default class Dijkstra {
  constructor(graph) {
    // Custo dos nós
    this.costs = {
      [FINISH_KEY]: Infinity,
    }

    // Nós pais
    this.parents = {
      [FINISH_KEY]: null,
    }

    // Nós já processados
    this.processed = []

    // O próprio grafo
    this.graph = graph

    /**
     * Primeiro, verifica se o existe um ponto de partida, caso
     * não exista dispara um erro
     */
    if (!has(graph, START_KEY)) {
      throw new Error(
        [
          'O grafo não tem um ponto de partida.',
          'Certifique-se que o grafo descrito no arquivo de entrada possui um ponto de partida.',
        ].join('\n')
      )
    }

    // Adiciona os nós filhos da partida ao custos
    Object.assign(this.costs, graph[START_KEY])

    // Adiciona os nós filhos do ponto de chegada
    for (const child in graph[START_KEY]) {
      this.parents[child] = START_KEY
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
    // Os nós atuais
    const nodes = Object.keys(this.costs)

    // O nó mais barato
    let lowest = null

    /**
     * Percorre os nós verificando se ele é menor que
     * 'lowest', ao encontrar substitui lowest pelo nó
     */
    for (let i = 0; i < nodes.length; ++i) {
      // O nó atual
      const thisNode = nodes[i]

      // O custo do nó atual
      const thisCost = this.costs[thisNode]

      // O custo do menor nó
      const lowestCost = this.costs[lowest]

      if (lowest === null || thisCost < lowestCost) {
        if (!this.wasProcessed(thisNode)) {
          lowest = thisNode
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

    while (node) {
      // O custo do nó atual
      const cost = this.costs[node]

      // Filhos do nó atual
      const childrens = this.graph[node]

      for (const children in childrens) {
        // O custo para ir até o filho
        const childrenCost = childrens[children]

        // O novo custo calculado
        const newCost = cost + childrenCost

        /**
         * Caso o custo para esse nó ainda não tenha sido calculado
         * adiciona-o
         */
        if (!has(this.costs, children)) {
          // Adiciona o novo custo calculado
          this.costs[children] = newCost

          // Registra o pai do nó
          this.parents[children] = node
        }

        // O custo já calculado desse filho
        const oldCost = this.costs[children]

        /**
         * Caso o custo do novo nó seja menor, o substitui
         * no registro de custos
         */
        if (newCost < oldCost) {
          this.costs[children] = newCost
          this.parents[children] = node
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
    let optimalPath = [FINISH_KEY]
    let parent = this.parents[FINISH_KEY]

    while (parent) {
      // Adiciona o pai ao caminho ótimo
      optimalPath = [parent, ...optimalPath]

      // Prepara para próxima iteração
      parent = this.parents[parent]
    }

    return optimalPath
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
      distance: this.costs[FINISH_KEY],
      path: this.getOptimalPath(),
    }
  }
}
