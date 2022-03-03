const utils = require('../project_modules/utils');
const unordered = require('./fixtures/unordered.json');
const orederConsecutively = require('./fixtures/ordered_consecutively.json');
const orderedPreRepeated = require('./fixtures/ordered_pre_repeated.json');
const orderedPostRepeated = require('./fixtures/ordered_post_repeated.json');
const orderedPrePostRepeated = require('./fixtures/ordered_pre_post_repeated.json');

describe ('Testing utilities', () => {
  test('quicksort of list', () => {
    const result = utils.quickSort(unordered, 0, unordered.length - 1);
    expect(result).toEqual(orederConsecutively)
  })

  test('find couples in consecutively ordered list', () => {
    const result1 = utils.findCouples(orederConsecutively, 11)
    const expected1 = [
      ['Name_1 Last_1','Name_10 Last_10'],
      ['Name_2 Last_2','Name_9 Last_9'],
      ['Name_3 Last_3','Name_8 Last_8'],
      ['Name_4 Last_4','Name_7 Last_7'],
      ['Name_5 Last_5','Name_6 Last_6'],
    ]
    expect(result1).toEqual(expected1);

    const result2 = utils.findCouples(orederConsecutively, 13)
    const expected2 = [
      ['Name_3 Last_3','Name_10 Last_10'],
      ['Name_4 Last_4','Name_9 Last_9'],
      ['Name_5 Last_5','Name_8 Last_8'],
      ['Name_6 Last_6','Name_7 Last_7'],
    ]
    expect(result2).toEqual(expected2);

    const result3 = utils.findCouples(orederConsecutively, 15)
    const expected3 = [
      ['Name_5 Last_5','Name_10 Last_10'],
      ['Name_6 Last_6','Name_9 Last_9'],
      ['Name_7 Last_7','Name_8 Last_8'],
    ]
    expect(result3).toEqual(expected3);
  })

  test('find couples in ordered list with repeated values at front', () => {
    const result = utils.findCouples(orderedPreRepeated, 139);
    const expected = [
      ['Name_1 Last_1','Name_6 Last_6'],
      ['Name_2 Last_2','Name_6 Last_6'],
      ['Name_3 Last_3','Name_6 Last_6'],
      ['Name_4 Last_4','Name_5 Last_5'],
    ]
    expect(result).toEqual(expected);
  })

  test('find couples in ordered list with repeated values at back', () => {
    const result = utils.findCouples(orderedPostRepeated, 139);
    const expected = [
      ['Name_1 Last_1','Name_6 Last_6'],
      ['Name_1 Last_1','Name_5 Last_5'],
      ['Name_1 Last_1','Name_4 Last_4'],
      ['Name_2 Last_2','Name_3 Last_3'],
    ]
    expect(result).toEqual(expected);
  })

  test('find couples in ordered list with repeated values at front and back', () => {
    const result = utils.findCouples(orderedPrePostRepeated, 139);
    const expected = [
      ['Name_1 Last_1','Name_8 Last_8'],
      ['Name_1 Last_1','Name_7 Last_7'],
      ['Name_1 Last_1','Name_6 Last_6'],
      ['Name_2 Last_2','Name_8 Last_8'],
      ['Name_2 Last_2','Name_7 Last_7'],
      ['Name_2 Last_2','Name_6 Last_6'],
      ['Name_3 Last_3','Name_8 Last_8'],
      ['Name_3 Last_3','Name_7 Last_7'],
      ['Name_3 Last_3','Name_6 Last_6'],
      ['Name_4 Last_4','Name_5 Last_5'],
    ]
    expect(result).toEqual(expected);
  })

  test('return empty when no couples found', () => {
    const result = utils.findCouples(orederConsecutively, 20)
    expect(result).toEqual([])
  })

})