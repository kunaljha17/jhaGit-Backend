const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOtpEmail(toEmail, otp) {
  const { data, error } = await resend.emails.send({
    from: 'jhaGit <noreply@kunalkj.dev>', // swap to your own domain later, e.g. noreply@yourdomain.com
    to: [toEmail],
    subject: 'Your jhaGit verification code',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Verify your jhaGit account</h2>
        <p>Your verification code is:</p>
        <p style="font-size: 28px; font-weight: bold; letter-spacing: 4px;">${otp}</p>
        <p>This code expires shortly. If you didn't request this, you can ignore this email.</p>
      </div>
    `,
  });

  if (error) {
    console.error('Resend email failed:', error);
    throw new Error(error.message || 'Failed to send OTP email');
  }

  console.log('OTP email sent via Resend:', data.id);
  return data;
}

module.exports = { sendOtpEmail };