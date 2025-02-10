import User from "../models/users.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
const getUsersForSidebar = asyncHandler(async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password "
    );

    return res
      .status(200)
      .json(new ApiResponse(200, users, "users fetched successfully"));
  } catch (error) {
    console.log(
      "message.controller.js getUsersForSidebar error ",
      error.message
    );
    throw new ApiError(500, "Internal Server Error");
  }
});

const getMessages = asyncHandler(async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    return res
      .status(200)
      .json(new ApiResponse(200, messages, "messages fetched successfully"));
  } catch (error) {
    console.log(
      "message.controller.js getUsersForSidebar error ",
      error.message
    );
    throw new ApiError(500, "Internal Server Error", [error]);
  }
});

const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const image = req.file.path;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadedResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl || "",
    });

    await newMessage.save();

    return res
      .status(200)
      .json(new ApiResponse(200, newMessage, "message sent successfully"));
  } catch (error) {
    console.log("message.controller.js sendmessage error ", error.message);
    next(error);
  }
};
export { getUsersForSidebar, getMessages, sendMessage };
