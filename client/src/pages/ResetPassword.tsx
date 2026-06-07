import { useEffect, useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { changePassword } from "../services/AuthServices";

interface ResetPasswordFormField {
    password : string,
    confirmPassword : string
}

const ResetPassword = () => {
    const {register, handleSubmit, watch, setError, formState : { errors, isSubmitting }} = useForm<ResetPasswordFormField>();
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const token = searchParams.get('token') || '';

    const password = watch('password');

    useEffect(() => {
        if (!token) {
            setMessage('No token found in the link.');
            return;
        }
    }, [searchParams]);

    const onSubmit : SubmitHandler<FieldValues> = async (data) => {
        try{
            const response = await changePassword(data, token);

            setMessage(response.message);
            setSuccess(true);
        } catch (err: any){
            setError('root', {
                message: err.message
            })
        }
    }
    
    if (!token) return <div>No token found in the link.</div>
    
    return (
        <>
        {success ? 
            <div className="flex w-full justify-center">
                <p>{message}</p>
            </div>
        :
            <div className="w-full flex justify-center">
                <div className="bg-white rounded-2xl w-full max-w-md p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-black">
                    Change Password
                    </h2>
                    {/* Account: {user}<br/><br/> */}
                    {message}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                            <br/>
                            {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-black">Confirm Password</label>
                            <input type="password" className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black" placeholder="••••••••" 
                            {...register('confirmPassword', {
                                required : "Confirm Password is required",
                                validate: (value) => value === password || 'The passwords do not match',
                            })}
                            />
                            <br/>
                            {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
                        </div>

                        <br/>
                        <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                            Confirm
                        </button>
                    </form>
                </div>
            </div>
        }
        </>
    )
}

export default ResetPassword;