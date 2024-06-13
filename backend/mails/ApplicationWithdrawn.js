export const ApplicationWithdrawn = (name, registerNumber) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Leave Application Withdrawn</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
          }
          .header {
            background-color: #dc3545; /* Red color */
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 20px;
          }
          .footer {
            text-align: center;
            padding: 10px 0;
            color: #777777;
            font-size: 12px;
          }
          a.button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 10px;
            background-color: #dc3545; /* Red color */
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          p {
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Leave Application Withdrawn</h1>
          </div>
          <div class="content">
            <p>Hi ${name}, (${registerNumber})</p>
            <p>Your leave application has been withdrawn.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};
