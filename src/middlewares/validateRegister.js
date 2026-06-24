const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Campos obligatorios sin completar",
    });
  }

  if (typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Nombre inválido",
    });
  }

  if (typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Email inválido",
    });
  }

  if (typeof password !== "string" || password.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Password inválida",
    });
  }

  next();
};

export default validateRegister;
