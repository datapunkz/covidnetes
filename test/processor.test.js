var Processor = require('../processor')

let raw,
    expected

beforeEach(() => {
    raw =  {
        posNeg: 1204651,
        death: 21640,
        score: 4,
        negative: 867596,
        total: 1204651,
        commercialScore: 1,
        hospitalizedCumulative: 73143,
        positiveScore: 1,
        state: 'NY',
        totalTestResults: 1204651,
        inIcuCurrently: 2450,
        checkTimeEt: '5/11 16:38',
        dateChecked: '2020-05-11T20:38:00Z',
        negativeRegularScore: 1,
        fips: '36',
        onVentilatorCurrently: 2020,
        dateModified: '2020-05-10T04:00:00Z',
        positive: 337055,
        recovered: 58363,
    }

    expected = {
        "state": "NY",
        "totalTestResults": 1204651,
        "death": 21640,
        "negative": 867596,
        "positive": 337055,
        "percentPositive": 0.2797947289297896,
        "percentNegative": 0.7202052710702104
      }
    
})

describe('Testing the Processor', () => {
  describe('when a raw JSON object is received', () => {
    it('should process it', () => {
        expect(Processor.process(raw)).toEqual(expected)
    });
  });
});