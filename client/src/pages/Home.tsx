import typescriptIcon from '../assets/images/typescript.png';
import mernLogo from '../assets/images/design/MERN-logo.png';
import authenticationLogo from '../assets/images/design/authentication.png';
import tailwindLogo from '../assets/images/design/tailwind-logo.png';
import stripePaymentImage from '../assets/images/design/stripe-payment-2.png';
import dockerImage from '../assets/images/docker-icon.webp';
import awsImage from '../assets/images/aws-icon.webp';
import CICDImage from '../assets/images/CICDBlog.webp';
import { motion } from 'framer-motion';
import HeroBanner from '../components/HeroBanner';

const Home = ({ onHeroBannerClick } : {onHeroBannerClick : () => void}) => {
    return(
        <>
            {/* HERO */}
            <HeroBanner onHeroBannerClick={() => onHeroBannerClick()}/>
            {/* MERN STACK */}
            <div className="bg-[#121212] w-full">
                <div id="system-details" className='w-full text-center mx-auto text-white text-4xl p-8'>SYSTEM</div>
                <div className="w-full flex justify-center py-8">
                    <motion.div className='md:w-3/5 w-full h-full self-center flex md:flex-row flex-col'
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} >
                        <div className="w-full flex flex-col vertical">
                            <div className="flex justify-center items-center h-full">
                                <div className="md:w-1/2 w-9/10 flex justify-center border bg-[#1A1D20] p-8 border-slate-200 rounded-xl shadow-md shadow-white">
                                    <p className="text-2xl text-white">
                                        Powered By: <br/><br/>
                                        <img src={mernLogo} className="base" width="400" height="400" alt="" /><br/>
                                        <div className='w-full flex gap-4'>
                                            <img src={typescriptIcon} className="base" width="64" height="64" alt="" />
                                            <img src={tailwindLogo} className="base" width="64" height="64" alt="" />
                                        </div>
                                        
                                    </p>
                                </div> 
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center md:mt-0 mt-5">
                            <p className='text-2xl text-green-500'>
                                <pre className='text-sm text-white'>Database:</pre>
                                <pre>   MongoDB (NoSQL)</pre>
                                <pre className='text-sm text-white'>Web Framework:</pre>
                                <pre>   Express</pre>
                                <pre className='text-sm text-white'>Front End Library:</pre>
                                <pre>   React</pre>
                                <pre className='text-sm text-white'>Runtime:</pre>
                                <pre>   NodeJS</pre>
                                <pre className='text-sm text-white'>Programming Language</pre>
                                <pre>   TypeScript</pre>
                                <pre className='text-sm text-white'>CSS Framework:</pre>
                                <pre>   Tailwind</pre>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Features and Libraries */}
            <div className="bg-[#121212] w-full">
                <div className='w-full text-center mx-auto text-white text-4xl p-8'>FEATURES & LIBRARIES</div>
                <div className="w-full flex justify-center py-8">
                    <motion.div className='w-3/5 h-full self-center md:flex md:flex-row'
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} >
                        <div className="w-full flex justify-center items-center ">
                            <p className='text-2xl text-green-500'>
                                <pre className='text-sm text-white'>Encryption:</pre>
                                <pre>   bcrypt</pre>
                                <pre className='text-sm text-white'>Token Management:</pre>
                                <pre>   jwt</pre>
                                <pre className='text-sm text-white'>MongoDB Library:</pre>
                                <pre>   mongoose</pre>
                                <pre className='text-sm text-white'>Emailer:</pre>
                                <pre>   nodemailer</pre>
                                <pre className='text-sm text-white'>Rate Limit:</pre>
                                <pre>   express-rate-limit</pre>
                            </p>
                        </div>
                        <div className="w-full flex justify-center items-center ">
                            <p className='text-2xl text-green-500'>
                                <pre className='text-sm text-white'>Animation:</pre>
                                <pre>   framer-motion</pre>
                                <pre className='text-sm text-white'>Token Management:</pre>
                                <pre>   jwt-decode</pre>
                                <pre className='text-sm text-white'>Security:</pre>
                                <pre>   helmet</pre>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Authentication */}
            <div className="bg-[#121212] w-full">
                <div className='w-full text-center mx-auto text-white text-4xl p-8'>AUTHENTICATION</div>
                <div className="w-full flex justify-center py-8">
                    <motion.div className='w-9/10 md:w-3/5 h-full self-center flex'
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} >
                        <div className="w-full flex justify-center items-center ">
                            <img src={authenticationLogo} className="base" width="250" height="250" alt="" /><br/>
                        </div>
                        <div className="w-full flex justify-center items-center ">
                            <p className='md:text-2xl text-white'>
                                A fully authenticated application using <span className='text-yellow-300'>JWT</span> tokens and custom middlewares for secured access to private APIs.<br/>
                                <br/>
                                <pre className='text-sm'>Includes:</pre>
                                <pre  className='break-word whitespace-pre-wrap text-xs text-yellow-300'>   Verify Email | Reset Password | Change Password</pre>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Payment */}
            <div className="bg-[#121212] w-full">
                <div className='w-full text-center mx-auto text-white text-4xl p-8'>PAYMENT</div>
                <div className="w-full flex justify-center py-8">
                    <motion.div className='w-9/10 md:w-3/5 h-full self-center flex'
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} >
                        <div className="w-full flex justify-center items-center ">
                            <p className='md:text-2xl text-white'>
                                <span className='text-[#635BFF]'>Stripe</span> mock payment system for secure transactions, used for a working <span className='text-[#635BFF]'>PRO</span> subscription for the app. Supports both checkout and cancellation for the subscription. Webhooks are implemented for seamless application-Stripe communication.
                            </p>
                        </div>
                        <div className="w-full flex justify-center items-center ">
                            <img src={stripePaymentImage} className="base" width="250" height="250" alt="" /><br/>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Docker */}
            <div className="bg-[#121212] w-full">
                <div className='w-full text-center mx-auto text-white text-4xl p-8'>CONTAINERIZATION</div>
                <div className="w-full flex justify-center py-8">
                    <motion.div className='w-9/10 md:w-3/5 h-full self-center flex'
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} >
                        <div className="w-full flex justify-center items-center ">
                            <img src={dockerImage} className="base" width="250" height="250" alt="" /><br/>
                        </div>
                        <div className="w-full flex justify-center items-center ">
                            <p className='md:text-2xl text-white'>
                                <span className='text-[#0db7ed]'>Docker</span> allows to build the app on an image, ensures cross platform compatibility and works exactly as it is in local development.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* AWS */}
            <div className="bg-[#121212] w-full">
                <div className='w-full text-center mx-auto text-white text-4xl p-8'>CLOUD-BASED SERVER</div>
                <div className="w-full flex justify-center py-8">
                    <motion.div className='w-9/10 md:w-3/5 h-full self-center flex'
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} >
                        <div className="w-full flex justify-center items-center ">
                            <p className='md:text-2xl text-white'>
                                The application's backend is deployed in <span className='text-[#FF9900]'>AWS</span> EC2 Instance using Ubuntu as OS
                            </p>
                        </div>
                        <div className="w-full flex justify-center items-center ">
                            <img src={awsImage} className="base" width="250" height="250" alt="" /><br/>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* CI/CD */}
            <div className="bg-[#121212] w-full">
                <div className='w-full text-center mx-auto text-white text-4xl p-8'>CI/CD</div>
                <div className="w-full flex justify-center py-8">
                    <motion.div className='w-9/10 md:w-3/5 h-full self-center flex'
                    initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} >
                        <div className="w-full flex justify-center items-center ">
                            <img src={CICDImage} className="base" width="250" height="250" alt="" /><br/>
                        </div>
                        <div className="w-full flex justify-center items-center ">
                            <p className='md:text-2xl text-white'>
                                Using Github and Netlify's continuous deployment features for deployment automation each time the code is pushed live. Backend runs through docker hub first and then pulling the image to EC2. In frontend the code just builds the react/vite code
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default Home