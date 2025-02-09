import ApiError from "../utils/ApiError.js";
import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import cloudinary from "../lib/cloudinary.js";

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (password.length < 6) {
      throw new ApiError(400, "password must be atleast 6 characters long ");
    }
    const user = await User.findOne({ email });

    if (user) throw new ApiError(400, "Email alredy exist");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res
        .status(201)
        .json(
          new ApiResponse(
            201,
            { _id: newUser._id, fullName: fullName, email: email },
            "user created successfully"
          )
        );
    }
  } catch (error) {
    console.log("error in sign controller ", error.message);
    throw new ApiError(500, "Internal server error");
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(400, "Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid credentials");
    }

    generateToken(user._id, res);

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { fullName: user.fullName, email, id: user._id },
          "login successfull"
        )
      );
  } catch (error) {
    console.log("auth controller login error: ", error.message);
    throw new ApiError(500, "Internal Server Error");
  }
};
const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json(new ApiResponse(200, {}, "logged out successfully"));
  } catch (error) {
    console.log("Error in logout controller ", error.message);
    throw new ApiError(500, "Internal Server Error");
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user_id;

    if (!profilePic) throw new ApiError(400, "Profile pic is required");

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select("-password");
    res
      .status(200)
      .json(
        new ApiResponse(200, updatedUser, "profilePic updated successfully")
      );
  } catch (error) {
    console.log("auth.controller.js updateProfile error: ", error);
    throw new ApiError(500, "Internal Server Error");
  }
};

const checkAuth = (req, res) => {
  try {
    res
      .status(200)
      .json(new ApiResponse(200, req.user, "user fetched successfully"));
  } catch (error) {
    console.log("auth.controller.js checkAuth Error: ", error);
    throw new ApiError(500, "Internal Server Error");
  }
};

export { login, logout, signup, updateProfile, checkAuth };
