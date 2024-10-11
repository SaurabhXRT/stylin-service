import nodemailer from "nodemailer";
import handlebars from "handlebars";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendEmail = async (
  to: string,
  name: string,
  email: string,
  password: string
) => {
  const emailTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
          }
          .header {
            background-color: #f8f8f8;
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #ddd;
          }
          .content {
            padding: 20px;
            text-align: left;
          }
          .footer {
            background-color: #f8f8f8;
            padding: 10px;
            text-align: center;
            border-top: 1px solid #ddd;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Welcome, {{name}}</h2>
          </div>
          <div class="content">
            <p>Dear {{name}},</p>
            <p>Your staff account has been created. Here are your login credentials:</p>
            <ul>
              <li><strong>Email:</strong> {{email}}</li>
              <li><strong>Password:</strong> {{password}}</li>
            </ul>
            <p>Please use these credentials to log in as staff in stylin website</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 stylin salon service. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const template = handlebars.compile(emailTemplate);
  const htmlToSend = template({ name, email, password });

  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: to,
    subject: "Your Stylin Staff Account Credentials",
    html: htmlToSend,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};
