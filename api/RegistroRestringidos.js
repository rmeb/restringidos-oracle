const {success, fail, error} = require('../utils/Reply')
const logger = require('../utils/Logger')
const {setRestricted} = require('../lib/Eth')

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
        logger.info('[actualizar]', hash)
        success(res, hash)
    }).catch(e => {
        logger.error(e)
        error(res, e.message)
    })
}

module.exports = {
    actualizar
}
  
  