import fs from 'fs'
import path from 'path'

import { FINISH_KEY, START_KEY } from './consts.js'
import Dijkstra from './Dijkstra.js'

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
    const matrix = fs
      .readFileSync(path.resolve(filePath), 'utf-8')
      .split('\n')
      .map((row) => {
        return row
          .split(' ')
          .map((col) => (col === '#' ? Infinity : Number(col)))
      })

    return matrix
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
  const content = getGraph()
  console.log({ content })

  try {
    const graph = new Dijkstra(content)
    const { distance, path } = graph.getResult()

    console.log("● Distância da 'partida' até 'chegada': ", distance, '\n')
    console.log('Caminho:')

    for (const node of path) {
      const prefixSymbol = [0, content.length - 1].includes(node) ? '◊' : '●'
      console.log(`  ${prefixSymbol} ${node}`)
    }
  } catch (error) {
    console.error(error)
  }
}

main()
