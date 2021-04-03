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
 * Verifica se o formato do arquivo é um "".json"
 */
function fileExtensionIsValid() {
  const fileExt = path.extname(filePath)

  if (fileExt !== '.json') {
    console.error(
      [
        'O formato do arquivo não é valido.',
        `Esperado um arquivo com formato '.json', encontrado: '${fileExt}'.`,
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
    const fileContent = JSON.parse(
      fs.readFileSync(path.resolve(filePath), 'utf-8')
    )

    return fileContent
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
  fileExtensionIsValid()
  fileExists()

  // Obtém o grafo
  const content = getGraph()

  try {
    const graph = new Dijkstra(content)

    const { distance, path } = graph.getResult()

    console.log("● Distância da 'partida' até 'chegada': ", distance, '\n')
    console.log('Caminho:')

    for (const node of path) {
      const prefixSymbol = [START_KEY, FINISH_KEY].includes(node) ? '◊' : '●'
      console.log(`  ${prefixSymbol} ${node.toUpperCase()}`)
    }
  } catch (error) {
    console.error(error)
  }
}

main()
