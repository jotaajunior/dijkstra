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
