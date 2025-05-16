import jwt from "jsonwebtoken";



// Authentication middleware
const jwtVerifyMiddleware = async (req, res, next) => {
  const jwtToken =req.session.jwtToken;

  if (!jwtToken ) {
    return res.status(401).json({
      success: false,
      message: "JWT token is missing",
    });
  }

  

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid JWT token",
    });
  }
};


// authorization
const checkRoleMiddleware = async (req, res, next) => {
  const userRole = req?.user?.role;
  const method = req.method;
  const path = req.path;

  if (method === "POST" && path === "/products" && userRole!=="admin") {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to perform this action",
    });
  }

  next();
};

export { jwtVerifyMiddleware, checkRoleMiddleware };