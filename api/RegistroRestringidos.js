const {success, fail, error} = require('../utils/Reply')
const logger = require('../utils/Logger')

function actualizar(req, res) {
    logger.info('[actualizar]')
    let {codigo, restringido} = req.body

    if (!codigo || codigo.length === 0) {
        return fail(res, 'Parameter missing or invalid')
    }
    if (!restringido || restringido.length === 0) {
        return fail(res, 'Parameter missing or invalid')
    }
    

    success(res, 'Ok.')
}

module.exports = {
    actualizar
}
  
  