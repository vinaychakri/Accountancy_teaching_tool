const nodemailer = require("nodemailer");

const mailService = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "anushagowda673@gmail.com",
    pass: "nbzgdmuzioeyplhb",
  },
});

exports.RequestChangesController = async (req, res) => {
  try {
    const { username, whatChanges, WhyChanges, topicName } = req.body;

    // Email to User
    const userSubject = "Changes Request Received";
    const userHtmlContent = `
    <div style="font-family: 'Arial', sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">

    <h1 style="font-size: 24px; font-weight: bold; color: #80bd9e; text-align: center;">Dear ${username},</h1>
    
    <p style="font-size: 16px; margin-bottom: 20px; text-align: center;">We have received your request for changes on topic "<span style="font-weight: bold;">${topicName}</span>".</p>
    
    <div style="background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
  
      <h2 style="font-size: 18px; font-weight: bold; color: #333;">Changes Requested:</h2>
      <ul style="list-style-type: disc; margin-left: 20px; padding-left: 20px;">
        <li style="font-size: 16px; margin-bottom: 10px;">${whatChanges}</li>
      </ul>
      
      <h2 style="font-size: 18px; font-weight: bold; color: #333;">Reason for Changes:</h2>
      <p style="font-size: 16px; margin-bottom: 20px;">${WhyChanges}</p>
  
      <p style="font-size: 16px; text-align: center;">Thank you for using our service. We will get back to you in 24 hours.</p>
  
    </div>
  
    <p style="font-size: 16px; margin-top: 20px; text-align: center;">Best Regards,<br>A Teaching tool from Accountancy and Accounting Data
    </p>
  </div>
  
    `;

    const userMailOptions = {
      from: "anushagowda673@gmail.com",
      to: username,
      subject: userSubject,
      html: userHtmlContent,
    };

    // Email to Admin
    const adminSubject = `Request Changes from ${username}`;
    const adminHtmlContent = `
    <div style="font-family: 'Arial', sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
    <h2 style="font-size: 24px; font-weight: bold; color: #3498db; text-align: center;">Change Request Notification</h2>
    
    <p style="font-size: 16px; color: #555; text-align: left;">Dear Admin,</p>
    
    <p style="font-size: 16px; color: #555; text-align: left;">
      You have received a request from user <strong>${username}</strong> on topic "<strong>${topicName}</strong>" .
    </p>
    
    <div style="margin: 20px 0; padding: 10px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 16px; font-weight: bold; color: #333;">Changes Requested:</p>
      <ul style="list-style-type: disc; margin-left: 20px;">
        <li style="font-size: 14px; color: #555;">${whatChanges}</li>
      </ul>
    </div>
    
    <p style="font-size: 16px; color: #555; text-align: left;">
      <strong>Reason for Changes:</strong><br />
      <span style="font-size: 14px; color: #555;">${WhyChanges}</span>
    </p>
    
    <p style="font-size: 16px; color: #555; text-align: left;">
      Thank you for using our service.
    </p>
    
    <p style="font-size: 16px; color: #555; text-align: left;">
      Best Regards,<br />
      A Teaching tool from Accountancy and Accounting Data
    </p>
  </div>
  
    `;

    const adminMailOptions = {
      from: "anushagowda673@gmail.com",
      to: "anushagowda673@gmail.com",
      subject: adminSubject,
      html: adminHtmlContent,
    };

    // Sending Emails
    mailService.sendMail(userMailOptions, (userError, userInfo) => {
      if (userError) {
        console.log(userError);
        res.status(500).json({ errorMessage: "Failed to send user email." });
      } else {
        console.log("User Email sent: " + userInfo.response);

        // Sending Admin Email
        mailService.sendMail(adminMailOptions, (adminError, adminInfo) => {
          if (adminError) {
            console.log(adminError);
            res
              .status(500)
              .json({ errorMessage: "Failed to send admin email." });
          } else {
            console.log("Admin Email sent: " + adminInfo.response);
            res.json({
              message:
                "Thanks For request, We will get back to you in 24 hours.",
            });
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ errorMessage: "Failed to register. Please try again later." });
  }
};
