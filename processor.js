function process(res) {
    return {
        state: res.state,
        totalTestResults: res.totalTestResults,
        death: res.death,
        negative: res.negative,
        positive: res.positive,
        percentPositive: res.positive/res.totalTestResults,
        percentNegative: res.negative/res.totalTestResults
    }
}

module.exports = {
    process: process,
  };