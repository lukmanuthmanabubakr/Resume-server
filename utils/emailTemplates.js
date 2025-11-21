export const verificationEmailTemplate = (name, token) => {
  return `
    <h2>Hello ${name},</h2>
    <p>Thanks for signing up. Please verify your email by clicking the link below:</p>
    <a href="${process.env.CLIENT_URL}/verify/${token}">Verify Email</a>
    <br/><br/>
    <p>If you didn’t create this account, ignore this email.</p>
  `;
};
