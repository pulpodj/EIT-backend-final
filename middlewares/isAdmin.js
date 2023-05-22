function isAdmin(req,res,next){
    if(req.user.role !== 'ADMIN_ROLE'){
        return res.status(403).send({mgr:'No esta autorizado '})

    }
    next();


}

module.exports = isAdmin
