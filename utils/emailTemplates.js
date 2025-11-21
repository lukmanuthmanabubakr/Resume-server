export const verificationEmailTemplate = (name, token) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <style>
      @media (prefers-color-scheme: dark) {
        .email-container {
          background: #1a1a1a !important;
        }
        .email-card {
          background: #2d2d2d !important;
          border-color: #404040 !important;
        }
        .email-heading {
          color: #f5f5f5 !important;
        }
        .email-text {
          color: #d1d5db !important;
        }
        .email-subtext {
          color: #9ca3af !important;
        }
        .email-footer {
          color: #6b7280 !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0;">
    <div class="email-container" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; padding: 40px 20px; background: #f7f7f7;">
      
      <div class="email-card" style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px 30px; border-radius: 12px; border: 1px solid #eaeaea; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
        
        <!-- Logo -->
        <div style="text-align: center; margin-bottom: 32px;">
          <table cellpadding="0" cellspacing="0" border="0" align="center">
            <tr>
              <td style="padding-right: 10px;">
                <table cellpadding="0" cellspacing="0" border="0" style="width: 48px; height: 48px; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); border-radius: 10px;">
                  <tr>
                    <td style="text-align: center; vertical-align: middle; color: #ffffff; font-weight: bold; font-size: 28px; line-height: 48px;">
                      B
                    </td>
                  </tr>
                </table>
              </td>
              <td style="vertical-align: middle;">
                <span style="font-size: 28px; font-weight: bold; color: #111827;">BuildIt</span>
              </td>
            </tr>
          </table>
        </div>

        <!-- Greeting -->
        <h2 class="email-heading" style="color: #111827; font-size: 24px; margin: 0 0 20px 0; font-weight: 600;">
          Hello ${name}! 👋
        </h2>
        
        <!-- Main Message -->
        <p class="email-text" style="font-size: 16px; color: #4b5563; line-height: 1.6; margin: 0 0 28px 0;">
          Welcome to BuildIt! We're excited to have you on board. To get started, please verify your email address by clicking the button below:
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 36px 0;">
          <a 
            href="${process.env.CLIENT_URL}/verify/${token}"
            style="
              background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
              color: #ffffff;
              padding: 16px 40px;
              text-decoration: none;
              font-size: 16px;
              font-weight: 600;
              border-radius: 8px;
              display: inline-block;
              box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
              transition: transform 0.2s;
            "
          >
            Verify Email Address
          </a>
        </div>

        <!-- Divider -->
        <div style="border-top: 1px solid #e5e7eb; margin: 32px 0;"></div>

        <!-- Secondary Info -->
        <p class="email-subtext" style="font-size: 14px; color: #6b7280; line-height: 1.5; margin: 0 0 12px 0;">
          If the button doesn't work, copy and paste this link into your browser:
        </p>
        <p style="font-size: 13px; color: #16a34a; word-break: break-all; margin: 0 0 24px 0;">
          ${process.env.CLIENT_URL}/verify/${token}
        </p>

        <!-- Security Notice -->
        <div style="background: #f9fafb; border-left: 3px solid #16a34a; padding: 16px; border-radius: 6px; margin: 24px 0;">
          <p class="email-subtext" style="font-size: 14px; color: #6b7280; margin: 0; line-height: 1.5;">
            <strong style="color: #374151;">Security tip:</strong> If you didn't create an account with BuildIt, you can safely ignore this email. Your information is protected.
          </p>
        </div>

        <!-- Footer -->
        <p class="email-footer" style="font-size: 12px; color: #9ca3af; text-align: center; margin: 40px 0 0 0; line-height: 1.5;">
          © ${new Date().getFullYear()} BuildIt. All rights reserved.<br>
          Building better solutions, together.
        </p>
      </div>

      <!-- Extra Footer Text -->
      <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
        This email was sent to you because you signed up for BuildIt.
      </p>
    </div>
  </body>
  </html>
  `;
};

export const resetPasswordEmailTemplate = (name, token) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <style>
      @media (prefers-color-scheme: dark) {
        .email-container { background: #1a1a1a !important; }
        .email-card { background: #2d2d2d !important; border-color: #404040 !important; }
        .email-heading { color: #f5f5f5 !important; }
        .email-text { color: #d1d5db !important; }
        .email-subtext { color: #9ca3af !important; }
        .email-footer { color: #6b7280 !important; }
      }
    </style>
  </head>

  <body style="margin:0; padding:0;">
    <div class="email-container" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif; padding:40px 20px; background:#f7f7f7;">
      
      <div class="email-card" style="max-width:600px; margin:0 auto; background:#ffffff; padding:40px 30px; border-radius:12px; border:1px solid #eaeaea; box-shadow:0 2px 8px rgba(0,0,0,0.05);">

        <!-- Logo -->
        <div style="text-align:center; margin-bottom:32px;">
          <table align="center" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding-right:10px;">
                <table cellspacing="0" cellpadding="0" border="0" style="width:48px; height:48px; background:linear-gradient(135deg,#16a34a,#15803d); border-radius:10px;">
                  <tr>
                    <td style="text-align:center; color:#ffffff; font-size:28px; font-weight:bold; line-height:48px;">
                      B
                    </td>
                  </tr>
                </table>
              </td>
              <td style="vertical-align:middle;">
                <span style="font-size:28px; font-weight:bold; color:#111827;">BuildIt</span>
              </td>
            </tr>
          </table>
        </div>

        <!-- Greeting -->
        <h2 class="email-heading" style="color:#111827; font-size:24px; margin:0 0 20px 0; font-weight:600;">
          Hello ${name}! 👋
        </h2>

        <!-- Main Message -->
        <p class="email-text" style="font-size:16px; color:#4b5563; line-height:1.6; margin:0 0 28px 0;">
          You requested to reset your password. Click the button below to continue:
        </p>

        <!-- Button -->
        <div style="text-align:center; margin:36px 0;">
          <a href="${process.env.CLIENT_URL}/reset-password/${token}"
            style="background:#16a34a; color:#ffffff; padding:16px 40px; text-decoration:none; font-size:16px; font-weight:600; border-radius:8px; display:inline-block; box-shadow:0 4px 12px rgba(22,163,74,0.3);">
            Reset Password
          </a>
        </div>

        <!-- Divider -->
        <div style="border-top:1px solid #e5e7eb; margin:32px 0;"></div>

        <!-- Info -->
        <p class="email-subtext" style="font-size:14px; color:#6b7280; line-height:1.5; margin:0 0 12px 0;">
          If the button doesn't work, copy and paste this link into your browser:
        </p>

        <p style="font-size:13px; color:#16a34a; word-break:break-all; margin:0 0 24px 0;">
          ${process.env.CLIENT_URL}/reset-password/${token}
        </p>

        <!-- Security -->
        <div style="background:#f9fafb; border-left:3px solid #16a34a; padding:16px; border-radius:6px; margin:24px 0;">
          <p class="email-subtext" style="font-size:14px; color:#6b7280; margin:0; line-height:1.5;">
            <strong style="color:#374151;">Security tip:</strong> If you did not request a password reset, you can safely ignore this email. Your password is still secure.
          </p>
        </div>

        <!-- Footer -->
        <p class="email-footer" style="font-size:12px; color:#9ca3af; text-align:center; margin:40px 0 0 0; line-height:1.5;">
          © ${new Date().getFullYear()} BuildIt. All rights reserved.<br>
          Building better solutions, together.
        </p>

      </div>

      <p style="text-align:center; font-size:12px; color:#9ca3af; margin-top:20px;">
        This email was sent because a password reset was requested.
      </p>

    </div>
  </body>
  </html>
  `;
};
