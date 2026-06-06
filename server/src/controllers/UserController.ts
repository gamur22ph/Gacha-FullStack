import type { Request, Response } from "express";
import { User, type IUser } from "../models/User.js";
import jwt from 'jsonwebtoken';
import { sendResetPasswordEmail, sendVerificationEmail } from "../utils/SendEmail.js";
import bcrypt from "bcryptjs";
import type { AuthenticatedRequest } from "../utils/AuthMiddleware.js";
import { getIdentifierType } from "../utils/Helper.js";
import { ActivityLog } from "../models/ActivityLog.js";
import { AddActivityLog } from "../utils/ActivityLogsUtils.js";

interface UserRequest extends Request{
    body: {
        username : string,
        email : string,
        password : string,
    }
}

interface CreateUserRequest extends Request{
  body: {
    username: string,
    email: string,
    password: string
  }
}

interface RequestResetPasswordRequest extends Request{
  body: {
    email: string
  }
}

interface LoginRequest extends Request{
  body: {
    identifier: string,
    password: string
  }
}

interface VerificationRequest extends Request{
  body: {
    token : string
  }
}

interface ResetPasswordRequest extends AuthenticatedRequest{
  body: {
    password: string
  }
}

interface ChangePasswordRequest extends AuthenticatedRequest{
  body: {
    password: string,
    newPassword: string
  }
}

export const getUsers = async (req: UserRequest, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error : any) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createUser = async (req : CreateUserRequest, res : Response): Promise<void> => {
  const {username, email, password} = req.body
  
  const email_lowercase = email.trim().toLowerCase();
  const username_canonical = username.trim().toLowerCase();

  try {
    // 1. Take data from the request body
    const newUser = new User(
      {
        username : username.trim(),
        username_canonical : username_canonical,
        email : email_lowercase,
        password: password
      }
    );
    // 2. Save it to MongoDB
    const savedUser = await newUser.save();
    // 3. Send back the result

    const verificationToken = jwt.sign(
      { userId: newUser._id }, 
      process.env.JWT_EMAIL_VERIFY_SECRET as string, 
      { expiresIn: '1h' } // Link expires in 1 hour
    );

    const verificationUrl : string = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

    await sendVerificationEmail(newUser.email, verificationUrl);

    AddActivityLog(savedUser._id.toString(), "User Created.");

    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req: LoginRequest, res: Response) => {
  const { identifier, password } = req.body;
  const { identifierType, identifierValue } = getIdentifierType(identifier);
  try {

    const user = await User.findOne({ [identifierType]: identifierValue });

    if (!user) {
      return res.status(404).json({ message: "User does not exist." });
    }

    // Continue with password comparison...
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // THE GATEKEEPER CHECK
    if (!user.email_verified) {
      // Send a verification email
      const verificationToken = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_EMAIL_VERIFY_SECRET as string, 
        { expiresIn: '1h' } // Link expires in 1 hour
      );

      const verificationUrl : string = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

      await sendVerificationEmail(user.email, verificationUrl);

        return res.status(403).json({ 
          message: "Please verify your email before logging in. Check your inbox!" 
        });
    }

    // Generate Login JWT...
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    AddActivityLog(user._id.toString(), "Logged in.");
    res.status(200).json({ token, user: {
      username: user.username,
      email: user.email,
      pull_currency: user.pull_currency,
      pull_currency_fragment: user.pull_currency_fragment,
      total_pullCount: user.total_pullCount,
      star_5_pity: user.star_5_pity,
      star_4_pity: user.star_4_pity,
      subscription_status: user.subscription_status,
      plan_tier: user.plan_tier,
      is_guest: user.is_guest,
      claim_date: user.next_daily_claim.getTime()
    } });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const loginGuestUser = async (req: VerificationRequest, res: Response) => {
  const { token } = req.body;

  console.log("TEST CI/CD");

  if (token){
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id : string };
      const existingUser = await User.findById(decoded.id);
      if (existingUser){
        AddActivityLog(existingUser._id.toString(), "Logged in.");
        return res.json({ token, user: {
          username: existingUser.username,
          email: existingUser.email,
          pull_currency: existingUser.pull_currency,
          pull_currency_fragment: existingUser.pull_currency_fragment,
          total_pullCount: existingUser.total_pullCount,
          star_5_pity: existingUser.star_5_pity,
          star_4_pity: existingUser.star_4_pity,
          subscription_status: existingUser.subscription_status,
          plan_tier: existingUser.plan_tier,
          is_guest: existingUser.is_guest,
          claim_date: existingUser.next_daily_claim.getTime()
        }})
      }
    }
    catch(err: any){}
  }
  

  try {
    const randomId = Math.floor(100000 + Math.random() * 900000);

    const newGuestUser = await User.create({
      username : `Guest_${randomId}`,
      username_canonical : `guest_${randomId}`,
      email: `guest_${randomId}@random.com`,
      email_verified: true,
      password: `guestuser${randomId}`,
      pull_currency: 50,
      pull_currency_fragment: 30,
      is_guest: true
    })

    await newGuestUser.save();

    // Generate Login JWT...
    const token = jwt.sign({ id: newGuestUser._id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });

    AddActivityLog(newGuestUser._id.toString(), "User Created.");
    AddActivityLog(newGuestUser._id.toString(), "Logged in.");
    res.status(200).json({ token, user: {
          username: newGuestUser.username,
          email: newGuestUser.email,
          pull_currency: newGuestUser.pull_currency,
          pull_currency_fragment: newGuestUser.pull_currency_fragment,
          total_pullCount: newGuestUser.total_pullCount,
          star_5_pity: newGuestUser.star_5_pity,
          star_4_pity: newGuestUser.star_4_pity,
          subscription_status: newGuestUser.subscription_status,
          plan_tier: newGuestUser.plan_tier,
          is_guest: newGuestUser.is_guest,
          claim_date: newGuestUser.next_daily_claim.getTime()
        }});

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyUserEmail = async (req : VerificationRequest, res : Response) => {
  const { token } = req.body;

  try {
    // 1. Verify the token signature
    const decoded = jwt.verify(token, process.env.JWT_EMAIL_VERIFY_SECRET as string) as { userId: string };
    const user = (await User.findById(decoded.userId)) as IUser;

    if (!user){
      res.status(404).json({ message: "User not found"});
      return;
    }

    if (user.email_verified) {
      // We return 200 (Success) because the goal is already achieved.
      // This prevents the user from seeing an "Error" just because they clicked twice.
       res.status(200).json({ message: "Email already verified. You're good to go!" });
       return
    }

    // 2. Find user and flip the switch
    user.email_verified = true
    user.save()

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

export const resetPassword = async (req : ResetPasswordRequest, res : Response) => {
  const userId = req.userId;

  if (!userId){
    return res.status(401).json({message: "User doesn't exist."});
  }

  const {password} = req.body;

  try {
    // 1. Find the user
    const user = (await User.findById(userId)) as IUser;

    if (!user){
      res.status(404).json({ message: "User not found"});
      return;
    }

    // 2. change the password and save
    user.password = password;
    user.save();

    AddActivityLog(userId, "Changed Password.");

    res.status(200).json({ message: "Changed password successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token." });
  }
};

export const requestResetPassword = async (req: RequestResetPasswordRequest, res: Response) => {
  const { email } = req.body; // This is a string from the URL
  
  try {
    const user = await User.findOne({ email : email.trim().toLowerCase() });

    if (!user){
      return res.status(404).json({message: "User not found"});
    }
    
    const resetToken = jwt.sign(
      { userId: user._id, currentHash: user.password }, 
      process.env.JWT_RESET_SECRET as string, 
      { expiresIn: '10m' } // Link expires in 10 minutes
    );

    const resetUrl : string = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    await sendResetPasswordEmail(user.email, resetUrl);

    AddActivityLog(user._id.toString(), "Requested Reset Password.");

    res.status(200).json({message: "Reset Password Email Sent."});
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const changePassword = async (req : ChangePasswordRequest, res : Response) => {
  const userId = req.userId;

  if (!userId){
    return res.status(401).json({
      success: "false", 
      message: "User doesn't exist."
    });
  }

  const {password, newPassword} = req.body;

  try {
    // 1. Find the user
    const user = (await User.findById(userId)) as IUser;

    if (!user){
      return res.status(404).json({
        success: "false", 
        message: "User not found."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return res.status(404).json({
        success: "false", 
        message: "Wrong old password."
      })
    }

    user.password = newPassword;
    user.save();

    AddActivityLog(userId, "Changed Password.");

    console.log("New Password: " + newPassword);

    return res.status(200).json({ 
      success: "true",
      message: "Changed password successfully!" 
    });
  } catch (error) {
    return res.status(400).json({ 
      success: "false",
      message: "Invalid or expired token." 
    });
  }
};

export const updateUser = async (req: UserRequest, res: Response): Promise<void> => {
  const { id } = req.params; // This is a string from the URL

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req: UserRequest, res: Response): Promise<void> => {
  await User.findByIdAndDelete(req.params.id);

  res.json({ message: "User deleted successfully" });
};

export const getDataOnPayment = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;

  if (!userId){
    return res.status(400).json({message : "User not found."});
  }

  try{
    const user = await User.findById(userId).lean();

    if (!user){
      return res.status(401).json({message : "User not found."});
    }

    return res.status(200).json({
      pull_currency: user.pull_currency,
      subscription_status: user.subscription_status,
      plan_tier: user.plan_tier
    });
  }
  catch(err : any){
    console.error(err.message)
  }
}

export const handleFragmentConversion = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;

  if (!userId){
    return res.status(400).json({message: "User not found"});
  }

  try {
    const user = await User.findById(userId);

    if (!user){
      return res.status(401).json({message: "User doesn't exist."});
    }

    if (user.pull_currency_fragment < 20) {
      return res.status(401).json({message: "Fragments are less than 20, can't convert fragment"});
    }

    user.pull_currency_fragment -= 20;
    user.pull_currency += 1;

    await user.save();

    AddActivityLog(userId, "Converted fragments to currency.");

    res.status(200).json({
      pull_currency: user.pull_currency,
      pull_currency_fragment: user.pull_currency_fragment
    });
  } catch (err: any) {
    console.error(err.message);
  }
}

export const getActivityLogs = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;

  if (!userId){
      return res.status(401).json({message: "No user found"});
  }

  const page = parseInt(req.query.page as string) || 1;
  const logsPerPage = 20;
    
  try{
    const totalLogs = await ActivityLog.countDocuments({ userId: userId});
    const totalPages = Math.ceil(totalLogs / logsPerPage) || 1;
            
    const userActivityLogs = await ActivityLog.find({ userId : userId })
    .sort({ timestamp: -1, _id : -1 })
    .skip((page - 1) * logsPerPage)
    .limit(logsPerPage)
    .lean();

    res.status(200).json({
        userActivityLogs: userActivityLogs,
        totalPages: totalPages
    });

  }
  catch (err: any) {
    console.error(err.message)
  }
}