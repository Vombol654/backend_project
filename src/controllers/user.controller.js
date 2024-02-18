const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const User = require("../models/user.model");
const uploadOnCloudinary = require("../utils/cloudinary");
const ApiResponse = require("../utils/apiResponse");
exports.registerUser = asyncHandler(async (req, res) => {
  // get userdetails from front-end
  // validation - not empty
  // check if user alrady exists: usernameand email
  // check for images and check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  const { fullname, username, email, password } = req.body;

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw ApiError(400, "all fields are required");
  }
  const existedUser = User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(409, "user with email or username alrady exists");
  }
  const avatar_local = req.files?.avatar[0].path;
  const coverImage_local = req.files?.coverImage[0].path;

  if (!avatar_local) throw new ApiError(400, "Avatar image is required");

  const avatar = await uploadOnCloudinary.uploadOnCloudinary(avatar_local);
  const coverImage = await uploadOnCloudinary.uploadOnCloudinary(
    coverImage_local
  );

  if (!avatar) {
    throw new ApiError(400, "Avatar image is required");
  }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "something went wrong while creating user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});
