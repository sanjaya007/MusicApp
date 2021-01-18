function respondJson(res, status, message, result){
    res.json({
        status: status,
        message: message,
        result: result
    })
}

module.exports = {
    respondJson: respondJson
}