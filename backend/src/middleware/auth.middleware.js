import jwt from "jsonwebtoken";
import User from "../models/users.model.js";
import ApiError from "../utils/ApiError.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      throw new ApiError(401, "Unauthorized - No Token Provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw new ApiError(401, "Unauthorized - Invalid Token");
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    next(error);
  }
};
