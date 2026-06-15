const validateSong = (req,res,next) => {
    const body = req.body;

    if (!body || Object.keys(body).length === 0){
        return res.status(400).json({
            success: false,
            message: "El body no puede estar vacío",
        });
    }

    for (const [key,value] of Object.entries(body)){
        if (typeof value === "string" && value.trim() === ""){
            return res.status(400).json({
                success:false,
                message: `El campo '${key}' no puede estar vacío`,
            });
        }
    }

    next();

};

export default validateSong;