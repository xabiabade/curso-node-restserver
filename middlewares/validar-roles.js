const { response } = require("express");
const { request } = require("express");


const esAdminRole=(req=request,res=response,next)=>{

    if(!req.usuario){
        return res.status(500).json({
           msg:'Se quiere verificar el rol sin validar token' 
        });
    }

    const{rol,nombre} =req.usuario;

    if (rol!== 'ADMIN_ROLE' ){
        returnres.status(401).json({
            msg:`${nombre} no es un admin`
        });
    }
    next();
}


const tieneRole =(...roles)=>{



    return (req,res=response,next)=>{
        
        if(!req.usuario){
            return res.status(500).json({
               msg:'Se quiere verificar el rol sin validar token' 
            });
        }

        if (!roles.includes(req.usuario.rol)){// aki esta comprobando el el rol no esta en los roles admitidos
            return res.status(401).json({
                msg:'rol no valido'
            });
        }

    
        next();
    }


    
}

module.exports={
    esAdminRole,
    tieneRole
}