import typescriptIcon from '../assets/typescript.png'
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import type { ProfileModalProps } from '../props/ProfileModalProps';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { ENV } from '../helpers/EnvUtils';

interface FormField {
  currentPassword: String;
  newPassword: String;
  confirmPassword: String;
}

const ProfileModal = ({ profileModalType, onClose, onChangePasswordSuccess, onRemoveSubscription }: ProfileModalProps) => {
  const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm<FormField>();
  const { token, user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const newPassword = watch("newPassword");
  // const handleSubmit2 = async (e: React.SubmitEvent) => {
  //   e.preventDefault();
  //   setError(''); // Clear previous errors

  //   try {
  //     if (modalType === 'login') {
  //       const data = await loginUser(formData);
  //       console.log('Logged in:', data);

  //       onLoginSuccess(data.user, data.token);
  //     } else if (modalType === 'register') {
  //       const data = await registerUser(formData);
  //       console.log('Registered:', data);
  //     }
  //     onClose(); // Close modal on success
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  // };

  const finalSubmit : SubmitHandler<FieldValues> = async(formData) => 
  {
    if (formData.currentPassword === formData.newPassword) {
      setError("root", {
        message: "New password can't be the same as your old password."
      })
      return;
    }

    try {
      const response = await fetch(`${ENV.API_URL}/api/users/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          password: formData.currentPassword,
          newPassword: formData.newPassword
        })
      })

      const data = await response.json();

      if (data.success === "false"){
        console.log("not success");
        setError("root", {
          message: data.message
        })
        return;
      }

      onChangePasswordSuccess();
      onClose(); // Close modal on success
    } catch (err: any) {
      setError("root", {
        message: err.message
      })
    }
  }

  const cancelSubscription = async () => {
    try{
      setIsLoading(true);
      const response = await fetch(`${ENV.API_URL}/api/subscription/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          "cancelImmediately": true
        })
      })

      await new Promise(resolve => setTimeout(resolve, 2000));

      if (user) {
          updateUser({
            subscription_status: 'none',
            plan_tier: 'standard'
          });
        }

      setIsLoading(false);
      if(!response.ok){
        console.error("Error Removing Subscription");
      }

      onClose();
      onRemoveSubscription();
    }
    catch(err: any){
      setIsLoading(false);
      console.error(err.message);
    }
    
  }

  if (profileModalType === null) return null;

  return (
    // Backdrop (Darkens the background)
    <>
    {profileModalType === "change password" &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-grayscale-50">
        
        {/* Modal Box */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
          
          {/* Typescript Icon */}
          <img src={typescriptIcon} className="absolute top-4 left-4" width="32" height="32" alt="" />

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>

          <h2 className="text-3xl font-bold mb-6 text-center text-black">
            Change Password
          </h2>

          {errors.root && <p className="text-red-500 text-sm mb-2">{errors.root.message}</p>}
          
          <form onSubmit={handleSubmit(finalSubmit)} className="space-y-4">

            {/* CURRENT PASSWORD INPUT */}
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Password</label>
              <input type="password" className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="••••••••" 
                {...register('currentPassword', {
                  required : "Current Password is required",
                  minLength: {
                    value: 8,
                    message: "Must have at least 8 characters"
                  }
                })}
              />
              {errors.currentPassword && <span className='text-red-500'>{errors.currentPassword.message}</span>}
            </div>

            {/* NEW PASSWORD INPUT */}
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Password</label>
              <input type="password" className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="••••••••" 
                {...register('newPassword', {
                  required : "New Password is required",
                  minLength: {
                    value: 8,
                    message: "Must have at least 8 characters"
                  }
                })}
              />
              
              {errors.newPassword && <span className='text-red-500'>{errors.newPassword.message}</span>}
            </div>

            {/* CONFIRM PASSWORD INPUT */}
            <div>
              <label className="block text-sm font-medium mb-1 text-black">ConfirmPassword</label>
              <input type="password" className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="••••••••" 
                {...register('confirmPassword', {
                  required : "Confirm Password is required",
                  validate : (value) => value === newPassword || 'The passwords do not match'
                })}
              />
              {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
            </div>
            
            <button type="submit" disabled={isSubmitting} className="w-full text-white py-3 rounded-lg font-bold bg-blue-600 hover:bg-blue-700 transition-colors">
              Change Password
            </button>
          </form>
        </div>
      </div>
    }

    {profileModalType === "subscription cancellation" &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-grayscale-50">
        
        {/* Modal Box */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            ✕
          </button>

          <h2 className="text-3xl font-bold mb-6 text-center text-black">
            Subscription
          </h2>
          <div>
            Are you sure you want to cancel your subscription?<br/>
          </div>
          <button disabled={isLoading} onClick={cancelSubscription} className="w-full text-white py-3 rounded-lg font-bold bg-red-600 hover:bg-red-700 transition-colors">
            Remove Subscription
          </button>
        </div>
      </div>
    }
    </>
  );
};

export default ProfileModal;