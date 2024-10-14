const model = require("../MongoDB_Schemas/userSchema");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { jwtExpire, jwtSecret } = require("../jwt/keys");
const { promisify } = require("util");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const mailService = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "anushagowda673@gmail.com",
    pass: "nbzgdmuzioeyplhb",
  },
});
exports.userRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;
    const verificationToken = crypto.randomBytes(20).toString("hex");
    const existingUser = await model.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: "Email already exists. Please login instead.",
      });
    }

    const newUser = new model({
      firstName,
      lastName,
      email,
      password,
      userType,
      verificationToken,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    const mailOptions = {
      from: "anushagowda673@gmail.com",
      to: email,
      subject: "Account Verification ",
      html: `<div style="max-width: 500px; margin: 0 auto; text-align: center; padding: 20px; background-color: #f8f8f8; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <p style="color: #333; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Welcome to Our Community!</p>
      
      <p style="color: #555; font-size: 16px; margin-bottom: 30px;">
          Thank you for joining our community! To ensure the security of your account, please click the link below to verify your email address:
      </p>
      
      <a href="http://localhost:9887/verify/${verificationToken}" style="display: inline-block; padding: 15px 30px; background-color: #80bd9e; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px; transition: background-color 0.3s;">
          Verify Your Email
      </a>
  
      <p style="color: #555; font-size: 16px; margin-top: 30px;">
          If the above button doesn't work, you can also copy and paste the following link into your browser:
          <br />
          <code style="background-color: #eee; padding: 5px; border-radius: 3px; font-size: 14px; word-break: break-all;">http://localhost:9887/verify/${verificationToken}</code>
      </p>
  
      <p style="color: #777; font-size: 14px; margin-top: 20px;">
          Note: This link will expire in 24 hours for security reasons. If you did not create an account with us, please ignore this email.
      </p>
  </div>
  `,
    };

    mailService.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(" ✔ Email Sent ✔");
      }
    });
    res.json({
      message: `Registered successfully, please verify your email: ${email}`,
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Failed to register. Please try again later.",
    });
  }
};
exports.tokenVerificationController = async (req, res) => {
  const verificationToken = req.params.token;
  try {
    const user = await model.findOne({ verificationToken });

    if (user) {
      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();
      res.redirect("http://localhost:3000/login");
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await model.findOne({ email });

    if (!user) {
      return res.status(401).json({
        errorMessage: "Invalid email ",
      });
    }
    if (user.isVerified === false) {
      return res.status(401).json({
        errorMessage: "Email not verified",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        errorMessage: "Invalid password",
      });
    }

    const payload = {
      user: {
        _id: user._id,
      },
    };
    const signJwt = promisify(jsonwebtoken.sign);
    const token = await signJwt(payload, jwtSecret, { expiresIn: jwtExpire });

    const { _id: userId, userType } = user;
    res.json({
      token,
      user: { _id: userId, email, userType },
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: "Failed to log in. Please try again later.",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { forgotPasswordEmail } = req.body;

    const user = await model.findOne({ email: forgotPasswordEmail });

    if (!user) {
      return res.status(401).json({
        errorMessage: "Invalid email, please register ",
      });
    }

    const email = user.email;

    const mailOptions = {
      from: "anushagowda673@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `<div style="max-width: 500px; margin: 0 auto; text-align: center; padding: 20px; background-color: #f8f8f8; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
              <p style="color: #333; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Password Reset Request</p>
              
              <p style="color: #555; font-size: 16px; margin-bottom: 30px;">
                  We received a request to reset your password. To proceed with the password reset, please click the link below:
              </p>
              
              <a href="http://localhost:9887/reset/${user._id}" style="display: inline-block; padding: 15px 30px; background-color: #80bd9e; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px; transition: background-color 0.3s;">
                  Reset Password
              </a>
          
              <p style="color: #555; font-size: 16px; margin-top: 30px;">
                  If the above button doesn't work, you can also copy and paste the following link into your browser:
                  <br />
                  <code style="background-color: #eee; padding: 5px; border-radius: 3px; font-size: 14px; word-break: break-all;">http://localhost:9887/reset/${user._id}</code>
              </p>
          
              <p style="color: #777; font-size: 14px; margin-top: 20px;">
                  Note: This link will expire in 1 hour for security reasons. If you did not request a password reset, please ignore this email.
              </p>
          </div>`,
    };

    mailService.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          errorMessage: "Failed to send email. Please try again later.",
        });
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.json({ message: "Password reset email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      errorMessage: "Failed to reset password. Please try again later.",
    });
  }
};
exports.resetController = async (req, res) => {
  const resetId = req.params.id;
  try {
    const user = await model.findOne({ _id: resetId });
    if (user) {
      res.redirect(`http://localhost:3000/verifiedReset/${resetId}`);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.updatePasswordController = async (req, res) => {
  const { userId, newPassword } = req.body;
  try {
    const user = await model.findById({ _id: userId }); // Use await with findById to retrieve the document
    if (!user) {
      return res.status(404).json({ message: "Review not found" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save(); // Use await with save() to save the updated document

    res.json({
      message: "Password updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
