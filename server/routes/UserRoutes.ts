import express from "express";
import { getUsers, createUser, updateUser, deleteUser, verifyUserEmail, loginUser, requestResetPassword, resetPassword, getDataOnPayment, handleFragmentConversion, getActivityLogs, changePassword, loginGuestUser } from "../controllers/UserController.ts";
import { verifyResetToken, verifyToken } from "../utils/AuthMiddleware.ts";

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.put('/', updateUser)
userRoutes.delete('/:id', deleteUser);
userRoutes.post('/verify-email', verifyUserEmail);
userRoutes.post('/guest-login', loginGuestUser);
userRoutes.post('/request-resetpassword', requestResetPassword);
userRoutes.post('/finalize-resetpassword', verifyResetToken, resetPassword)
userRoutes.post('/change-password', verifyToken, changePassword)
userRoutes.get('/activity-logs', verifyToken, getActivityLogs);

userRoutes.get('/payment-success', verifyToken, getDataOnPayment);
userRoutes.post('/convert-fragments', verifyToken, handleFragmentConversion);

export default userRoutes