import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (to_email: string, url: string) : Promise<void> => {
  // 1. Create a "Transporter" (The mailman)
  // For now, we'll use a "dev" configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 517,
    auth: {
      user: process.env.EMAIL, // We will get these in the next step
      pass: process.env.PASSWORD,
    },
  });

  // 2. The actual Email content
  const mailOptions = {
    from: "noreply@devapp.com",
    to: to_email,
    subject: "Confirm your email address",
    html: `
      <div style="font-family: sans-serif; text-align: center;">
        <h2>Verify your account</h2>
        <p>Thanks for joining! Click the button below to confirm your email.</p>
        <a href="${url}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 20px;">
          Verify Email
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          This link expires in 1 hour.
        </p>
      </div>
    `,
  };

  // 3. Send it!
  await transporter.sendMail(mailOptions);
};

export const sendResetPasswordEmail = async (to_email: string, url: string) : Promise<void> => {
  // 1. Create a "Transporter" (The mailman)
  // For now, we'll use a "dev" configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 517,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // 2. The actual Email content
  const mailOptions = {
    from: "noreply@devapp.com",
    to: to_email,
    subject: "Reset your Password",
    html: `
      <div style="font-family: sans-serif; text-align: center;">
        <h2>Reset Password</h2>
        <p>Click the button below to change password.</p>
        <a href="${url}" style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 20px;">
          Change Password
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          This link expires in 10 minutes.
        </p>
      </div>
    `,
  };

  // 3. Send it!
  await transporter.sendMail(mailOptions);
};