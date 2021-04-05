/**
 * Converte o conteúdo do arquivo para uma matriz adjacente
 *
 * @param {string} content O conteúdo
 * @returns {array}
 */
export function toMatrix(content) {
  return content.map((row) => {
    return row.split(' ').map((col) => (col === '#' ? Infinity : Number(col)))
  })
}

/**
 * Retorna se a matriz é adjacente
 *
 * @param {array} matrix A matriz
 * @returns {boolean}
 */
export function isAdjacent(matrix) {
  const matrixLength = matrix.matrixLength

  for (const row of matrix) {
    if (row.length !== matrixLength) {
      return false
    }
  }

  return true
}
