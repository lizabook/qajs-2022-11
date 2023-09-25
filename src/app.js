/**
 * Проверка имени пользователя
 * @param {string} name
 * @returns {boolean}
 */

export const nameIsValid = (name) => !!name && name.length >= 2 && !name.includes(' ')

/**
 * Удаление пробелов из строки
 *
 * @param {string} text
 * @returns {string}
 */

export const fullTrim = (text) => (text || '').replace(/\s/g, '')

/**
 * Подсчёт суммы заказа
 *
 * @param {[{quantity: number, name?: string, price: number}]} items
 * @param {number} discount
 * @example getTotal([{ price: 10, quantity: 10 }]) // 100
 * @example getTotal([{ price: 10, quantity: 1 }]) // 10
 * @example getTotal([{ price: 10, quantity: 1 }, { price: 10, quantity: 9 }]) // 100
 * @example getTotal([{ price: 10, quantity: 0 }], { price: 10, quantity: 9 }) // 90
 * @example getTotal([{ price: 10, quantity: 10 }], 10) // 90
 * @example getTotal([{ price: 10, quantity: 10 }], 100) // 0
 */
export const getTotal = (items = [], discount = 0) => {
  if (typeof discount !== 'number') {
    throw new Error('Скидка должна быть числом')
  }
  if (discount < 0) {
    throw new Error('Процент скидки не может быть отрицательным')
  }
  const total = items.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)
  return total - total * discount / 100
}

/** Пример объекта с баллами студентов */
const scores = {
  Anna: 10,
  Helen: 3,
  James: 1,
  Peter: NaN
}
/** Функция нахождения суммы баллов студентов
 * scores - входящий объект
 * value - массив значений объекта
 * scoreSum - возвращаемая сумма баллов студентов
*/
export const getScore = (scores) => {
  const value = Object.values(scores) // запишем значения объекта в массив
  const isNumber = value.some(item => Number.isNaN(item + 0)) // проверим, что все значения - не NaN и не undefined
  if (!isNumber) {
    const scoreSum = value.reduce(function (sum, current) { // если значения суммируются, то сложим их все
      return sum + current
    })
    return `Сумма баллов всех студентов = ${scoreSum}` // вернём посчитанную сумму баллов
  } else return 'У кого-то из студентов указан некорректный балл, не умею считать такое' // если не можем посчитать, пожалуемся на это
}
