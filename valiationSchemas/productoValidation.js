const zod = require("zod")

const validationSchema = zod.object({
    nombre:zod.string(),
    precio:zod.number().positive().optional()
})
module.exports = validationSchema