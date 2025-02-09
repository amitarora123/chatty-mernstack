import User from "../models/users.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const getUsersForSidebar = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -email");

    return res
      .status(200)
      .json(new ApiResponse(200, users, "users fetched successfully"));
  } catch (error) {
    console.log(
      "message.controller.js getUsersForSidebar error ",
      error.message
    );
    next(error);
  }
};

export { getUsersForSidebar };
