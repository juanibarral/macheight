const utils = require('../project_modules/utils');

describe ('Testing utilities', () => {
  let mockList = [];
  beforeAll(() => {
    for( let i = 1; i <= 10; i++ ) {
      mockList.push({
        "first_name": `Name_${i}`,
        "h_in": i,
        "h_meters":  `2.${i}`,
        "last_name": `Last_${i}`,
      })
    }
  })

  test('find couples in sorted list without holes', () => {
    const result1 = utils.findCouples(mockList, 11)
    const expected1 = [
      ["Name_1 Last_1","Name_10 Last_10"],
      ["Name_2 Last_2","Name_9 Last_9"],
      ["Name_3 Last_3","Name_8 Last_8"],
      ["Name_4 Last_4","Name_7 Last_7"],
      ["Name_5 Last_5","Name_6 Last_6"],
    ]
    expect(result1).toEqual(expected1);

    const result2 = utils.findCouples(mockList, 13)
    const expected2 = [
      ["Name_3 Last_3","Name_10 Last_10"],
      ["Name_4 Last_4","Name_9 Last_9"],
      ["Name_5 Last_5","Name_8 Last_8"],
      ["Name_6 Last_6","Name_7 Last_7"],
    ]
    expect(result2).toEqual(expected2);

    const result3 = utils.findCouples(mockList, 15)
    const expected3 = [
      ["Name_5 Last_5","Name_10 Last_10"],
      ["Name_6 Last_6","Name_9 Last_9"],
      ["Name_7 Last_7","Name_8 Last_8"],
    ]
    expect(result3).toEqual(expected3);
  })

  test('return empty when no couples found', () => {
    const result = utils.findCouples(mockList, 20)
    expect(result).toEqual([])
  })

  test('return sliced list', () => {
    const result1 = utils.findFocusPlayers(mockList, 11)
    expect(result1).toEqual(mockList)

    const result2 = utils.findFocusPlayers(mockList, 15)
    expect(result2).toEqual(mockList.slice(4))
  })
})