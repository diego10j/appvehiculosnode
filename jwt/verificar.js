const jwt = require('jsonwebtoken');

// =====================
// Verificar Token
// =====================
let verificarToken = (req, res, next) => {
    let token = req.get('token');
    //SEED de autenticación    
    const SEED = 'este-es-el-seed-de-la-actividad';
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                error: true,
                mensaje:'Token no válido'                
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

module.exports = {
    verificarToken
}