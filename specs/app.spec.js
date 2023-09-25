import { expect, test } from '@jest/globals'
// eslint-disable-next-line no-unused-vars
import { nameIsValid, fullTrim, getTotal } from '../src/app.js'

/* Тест на функцию nameIsValid */
describe('nameIsValid', () => {
  it('import without error', () => {
    expect(nameIsValid).toBeTruthy()
    expect(nameIsValid).toBeDefined()
    expect(typeof nameIsValid).toBe('function')
  })
  it('happy path for name', () => {
    expect(nameIsValid('Elizabeth')).toBeTruthy()
    expect(nameIsValid('Li')).toBeTruthy()
    expect(nameIsValid('JaneAir')).toBeTruthy()
    expect(nameIsValid(fullTrim('Jane Air'))).toBeTruthy()
  })
  it('wrong name gets error', () => {
    expect(nameIsValid('a')).toBeFalsy()
    expect(nameIsValid('Jane Air')).toBeFalsy()
    expect(nameIsValid(132)).toBeFalsy()
    expect(nameIsValid('a')).toBeFalsy()
    expect(nameIsValid(nameIsValid('Jane'))).toBeFalsy()
  })
})
/* Тест на функцию fullTrim */
describe('fullTrim', () => {
  it('import without error', () => {
    expect(fullTrim).toBeTruthy()
    expect(fullTrim).toBeDefined()
    expect(typeof fullTrim).toBe('function')
  })

  it('cut every space', () => {
    expect(fullTrim('Jane Air')).toBe('JaneAir')
    expect(fullTrim('Jane   Air')).toBe('JaneAir')
    expect(fullTrim('Jane')).toBe('Jane')
    expect(fullTrim('Jane Air by Sharlotte Bronte')).toBe('JaneAirbySharlotteBronte')
    expect(fullTrim('Jane Air by    Sharlotte  Bronte')).toBe('JaneAirbySharlotteBronte')
  })

  it('wrong text gets error', () => {
    expect(() => fullTrim(123)).toThrow()
    expect(() => fullTrim(text)).toThrow()
    expect(() => fullTrim(nameIsValid('Jane'))).toThrow()
    expect(() => fullTrim(true)).toThrow()
  })
})

/* Тест на функцию getTotal */
describe('getTotal', () => {
  it('import without error', () => {
    expect(getTotal).toBeTruthy()
    expect(getTotal).toBeDefined()
    expect(typeof getTotal).toBe('function')
  })
  test.each`
  price1 | quantity1 | discount1 | expected
  ${10} | ${1} | ${0} | ${10}
  ${10} | ${10} | ${10} | ${90}
  ${10} | ${1} | ${undefined} | ${10}
  ${10} | ${1} | ${null} | ${'error'}
  ${10} | ${1} | ${'disc'} | ${'error'}
  ${10} | ${1} | ${-10} | ${'error'}
  ${'text'} | ${1} | ${10} | ${NaN}
  ${10} | ${'text'} | ${10} | ${NaN}
  ${undefined} | ${1} | ${10} | ${NaN}
  ${10} | ${undefined} | ${10} | ${NaN}
  `('$price1 * $quantity1 - % $discount1 = $expected', ({ price1, quantity1, discount1, expected }) => {
    if (expected === 'error') {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(() => getTotal([{ price: price1, quantity: quantity1 }], discount1)).toThrow()
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(getTotal([{ price: price1, quantity: quantity1 }], discount1)).toBe(expected)
    }
  })
  // не согласна с тем, что функция имеет проверку на то, что скидка - не число, но не имеет проверку на то, что цена/кол-во товара - не число
  // тест адаптирован под это, но в реальности я пошла бы заводить баг
})
