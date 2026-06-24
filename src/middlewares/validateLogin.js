const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email y password son obligatorios",
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

export default validateLogin;
