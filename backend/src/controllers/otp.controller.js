const Otp = require('../models/otp.model');
const { sendMail } = require('../utils/mailer');

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const otpEntry = new Otp({ email, code, expiresAt });
    await otpEntry.save();

    // try to send email but don't fail the API if mail sending fails (useful for dev/testing)
    try {
      await sendMail({
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${code}. It expires in 10 minutes.`,
      });
    } catch (mailErr) {
      console.warn('Failed to send OTP email, continuing (dev mode):', mailErr && mailErr.message ? mailErr.message : mailErr);
    }

    // log the OTP for development/testing convenience
    console.log(`Generated OTP for ${email}: ${code} (expires at ${expiresAt.toISOString()})`);

    // In non-production return the code in the response to make testing easier
    const responsePayload = { message: 'OTP sent' };
    if (process.env.NODE_ENV !== 'production') responsePayload.code = code;
    return res.status(200).json(responsePayload);
  } catch (err) {
    console.error('sendOtp error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ message: 'Email and code are required' });

    const otpEntry = await Otp.findOne({ email, code });
    if (!otpEntry) return res.status(400).json({ message: 'Invalid OTP' });

    if (otpEntry.expiresAt < new Date()) {
      await Otp.deleteOne({ _id: otpEntry._id });
      return res.status(400).json({ message: 'OTP expired' });
    }

    // optionally: delete used OTP
    await Otp.deleteOne({ _id: otpEntry._id });

    return res.status(200).json({ message: 'OTP verified' });
  } catch (err) {
    console.error('verifyOtp error', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
