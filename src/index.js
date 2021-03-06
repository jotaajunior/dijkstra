import fs from 'fs'
import path from 'path'

import Dijkstra from './Dijkstra.js'
import { toMatrix } from './utils/index.js'

/**
 * O caminho para o arquivo das definições do Grafo
 */
const [filePath] = process.argv.slice(2)

/**
 * Verifica se o arquivo existe, caso não exista dispara
 * uma mensagem de erro.
 */
function fileExists() {
  if (!fs.existsSync(filePath)) {
    console.error(
      [
        'O caminho para o arquivo não existe ou não é válido.',
        'Verifique o nome e o caminho do arquivo.',
      ].join('\n')
    )
    process.exit(1)
  }
}

/**
 * Realiza a leitura do arquivo
 */
function getGraph() {
  try {
    const [size, edges, ...graph] = fs
      .readFileSync(path.resolve(filePath), 'utf-8')
      .split('\n')

    return {
      size,
      edges: edges.split(' ').map((edge) => Number(edge)),
      content: toMatrix(graph),
    }
  } catch (error) {
    console.error(
      'O conteúdo do arquivo não é válido e não pôde ser lido. \n',
      error
    )
    process.exit(1)
  }
}

/**
 * Função principal
 */
function main() {
  // Realiza validações
  fileExists()

  // Obtém o grafo
  const graph = getGraph()

  try {
    // Obtém a distância e o caminho
    const { distance, path } = new Dijkstra(graph).getResult()

    // Exibe o caminho
    console.log('● Distância: ', distance, '\n')
    console.log('Caminho:')

    for (const node of path) {
      const prefixSymbol = [0, graph.size - 1].includes(node) ? '◊' : '●'
      console.log(`  ${prefixSymbol} ${node}`)
    }
  } catch (error) {
    console.error(error)
  }
}

main()
