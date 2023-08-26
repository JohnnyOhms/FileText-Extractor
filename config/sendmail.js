const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const asyncWrapper = require("../middlewares/asyncWrapper");
require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLEINT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = asyncWrapper(async (email) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "Johnchinweike08@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLEINT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: "JohnnyOhms <Johnchinweike08@gmail.com>",
      to: "to email address here",
      subject: "Reset your password",
      text: `https://localhost:9000/auth/resetpass?userId=&token=`,
      html: "<h2>Link to reset to email</h2>",
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
});

module.exports = sendMail;
