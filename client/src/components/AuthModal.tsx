import { registerUser, loginUser, requestResetPassword, loginGuestUser } from '../services/AuthServices';
import typescriptIcon from '../../public/images/typescript.png'
import type { AuthModalProps } from '../props/AuthModalProps';
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";

interface FormField {
  identifier?: string;
  username?: String;
  email?: String;
  password?: String;
  confirmPassword: String;
}

const AuthModal = ({ modalType, onClose, onSwitch, onLoginSuccess }: AuthModalProps) => {
  const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm<FormField>();
  
  const password = watch("password");
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
    try {
      if (modalType === 'login') {
        const data = await loginUser(formData);
        console.log('Logged in:', data);

        onLoginSuccess(data.user, data.token);
      } else if (modalType === 'register') {
        const data = await registerUser(formData);
        console.log('Registered:', data);
      } else if (modalType === 'change password') {
        await requestResetPassword(formData);
        console.log('Requested Reset Password on ', formData.email);
      }

      onClose(); // Close modal on success
    } catch (err: any) {
      setError("root", {
        message: err.message
      })
    }
  }

  const loginAsGuest = async () => {
    try{
      const data = await loginGuestUser();

      onLoginSuccess(data.user, data.token);
      onClose();
    }
    catch(err: any){
      setError("root", {
        message: err.message
      })
    }
  }

  if (modalType === null) return null;

  return (
    // Backdrop (Darkens the background)
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
          {modalType === "login" ? 'Login' : 
          modalType === "register" ? 'Create Account' :
          modalType === "change password" ? 'Change Password' :
          "default"
          }
        </h2>

        {errors.root && <p className="text-red-500 text-sm mb-2">{errors.root.message}</p>}
        
        <form onSubmit={handleSubmit(finalSubmit)} className="space-y-4">
          
          {/* IDENTIFIER INPUT */}
          {modalType === "login" && 
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Username or Email</label>
              <input type="text" className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="Enter Username or Email"
                {...register("identifier", {
                required: "Username or Email is required",
                pattern: {
                  value: /^\S+$/,
                  message: "Usernames or Email cannot contain spaces"
                }
              })}
              />
              {errors.identifier && <span className='text-red-500'>{errors.identifier.message}</span>}
            </div>
          }

          {/* USERNAME INPUT */}
          {modalType === "register" && 
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Username</label>
              <input type="text" className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="your_username"
                {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^\S+$/,
                  message: "Usernames cannot contain spaces"
                }
              })}
              />
              {errors.username && <span className='text-red-500'>{errors.username.message}</span>}
            </div>
          }

          {/* EMAIL INPUT */}
          {(modalType === "register" || modalType === "change password") &&
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Email</label>
              <input type="email" className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="you@example.com"
                {...register('email', {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid Email"
                  }
                })}
              />
              {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
            </div>
          }

          {/* PASSWORD INPUT */}
          {(modalType === "register" || modalType === "login") &&
            <div>
              <label className="block text-sm font-medium mb-1 text-black">Password</label>
              <input type="password" className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="••••••••" 
                {...register('password', {
                  required : "Password is required",
                  minLength: {
                    value: 8,
                    message: "Must have at least 8 characters"
                  }
                })}
              />
              {modalType === "login" &&
                <>
                  <button type="button" onClick={() => {onSwitch('change password')}} className="text-blue-600 text-sm hover:underline">
                  Forgot Password?
                  </button>
                  <br/>
                </>
              }
              
              {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
            </div>
          }

          {/* CONFIRM PASSWORD INPUT */}
          {modalType === "register" &&
            <div>
              <label className="block text-sm font-medium mb-1 text-black">ConfirmPassword</label>
              <input type="password" className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="••••••••" 
                {...register('confirmPassword', {
                  required : "Confirm Password is required",
                  validate : (value) => value === password || 'The passwords do not match'
                })}
              />
              {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
            </div>
          }
          

          <button type="submit" disabled={isSubmitting} className="w-full text-white py-3 rounded-lg font-bold bg-blue-600 hover:bg-blue-700 transition-colors">
            {modalType === "login" ? 'Login' : 
            modalType === "register" ? 'Sign Up' : 
            modalType === "change password" ? 'Reset Password' :
            ""}
          </button>
        </form>

        {modalType === 'login' &&
          <button onClick={loginAsGuest} disabled={isSubmitting} className="w-full mt-2 text-white py-3 rounded-lg font-bold bg-cyan-600 hover:bg-cyan-700 transition-colors">
            Login as Guest
          </button>
        }

        <p className="mt-6 text-center text-sm text-gray-600">
          {modalType === 'login' && 
            <>
              <span>Don't have an account? </span>
              <button onClick={() => { onSwitch('register') }} className="text-blue-600 font-bold hover:underline">
                Create one
              </button>
            </>
          }  
          
          {modalType === "register" && 
            <>
              <span>Already have an account? </span>
              <button  onClick={() => {onSwitch('login')}} className="text-blue-600 font-bold hover:underline">
                Log in
              </button>
            </>
          }

          {modalType === "change password" && 
            <>
              <button  onClick={() => {onSwitch('login')}} className="text-blue-600 font-bold hover:underline">
                Back to Log in
              </button>
            </>
          }
          
        </p>
      </div>
    </div>
  );
};

export default AuthModal;