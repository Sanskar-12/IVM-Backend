import { User } from "../models/User.js";

export const SignUp = async (req, res, next) => {
  try {
    const { username, password, user_level } = req.body;

    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    user = await User.create({
      username,
      password,
      user_level,
    });

    
    const options = {
      expires:new Date(Date.now()+15*24*60*60*1000),
        httpOnly:true,
        secure:true,
        sameSite:"none"
    };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill the required details",
      });
    }

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists",
      });
    }

    let token = await user.generateToken();

    const isMatch = await user.MatchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const options = {
      expires:new Date(Date.now()+15*24*60*60*1000),
        httpOnly:true,
        secure:true,
        sameSite:"none"
    };

    // const options = {
    //   expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    // };

    res.status(200).cookie("token", token, options).json({
      success: true,
      user,
      message:"Logged In"
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetUserDetail = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id).populate("institute_id");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetAllUser = async (req, res, next) => {
  try {
    let users = await User.find({}).populate("institute_id");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const AddaUser = async (req, res, next) => {
  try {
    const { username, password, user_level, image } = req.body;

    if (req.user.user_level !== "Superuser") {
      return res.status(200).json({
        success: false,
        message: "You are not authorised admin",
      });
    }

    await User.create({
      username,
      password,
      user_level,
      image,
    });

    res.status(200).json({
      success: true,
      message: "User Added",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const GetUserById=async(req,res,next)=>{
  try {
    const {id}=req.params

    const user=await User.findById(id)

    res.status(200).json({
      success:true,
      user
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export const logout = async (req, res, next) => {
  try {
    res.status(200).cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure:true,
      sameSite: "none",
      }).json({
        success: true,
        message: "Logged Out",
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
