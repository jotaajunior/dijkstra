/**
 * Retorna se a chave existe no objeto
 *
 * @param {Object} obj O objecto
 * @param {string} key A chave
 * @returns {boolean}
 */
export function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
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
