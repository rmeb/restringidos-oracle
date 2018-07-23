const {success, fail, error} = require('../utils/Reply')
const logger = require('../utils/Logger')
const {setRestricted, isRestricted} = require('../lib/Eth')

function actualizar(req, res) {
    logger.info('[actualizar]')
    let {codigo, restringido} = req.body

    if (!codigo || codigo.length === 0) {
        return fail(res, 'Parameter missing or invalid')
    }
    if (restringido === undefined) {
        return fail(res, 'Parameter missing or invalid')
    }

    setRestricted(codigo, restringido).then(hash => {
        logger.info('[actualizar.setRestricted]', hash)
        success(res, hash)
    }).catch(e => {
        logger.error(e)
        error(res, e.message)
    })
}

function consultar(req, res) {
    logger.info('[consultar]')
    let {codigo} = req.body

    if (!codigo || codigo.length === 0) {
        return fail(res, 'Parameter missing or invalid')
    }

    isRestricted(codigo).then(restringido => {
        logger.info('[consultar.isRestricted]', restringido._isRestricted)
        success(res, restringido._isRestricted)
    }).catch(e => {
        logger.error(e)
        error(res, e.message)
    })
}

module.exports = {
    actualizar,
    consultar
}
  
  