using Core.Settings;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;

namespace Core.Utils
{
    public class Email
    {
        public static string GetTemplate(string templateUrl)
        {
            string body = string.Empty;
            using (StreamReader reader = new StreamReader(templateUrl))
            {
                body = reader.ReadToEnd();
            }
            return body;
        }
        public static void Send(string recepientEmail, string subject, string body, List<string> bcc = null)
        {
            using (MailMessage mailMessage = new MailMessage())
            {
                mailMessage.From = new MailAddress(MailSettings.EmailDisplay);
                mailMessage.Subject = subject + " | " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                mailMessage.Body = body;
                mailMessage.IsBodyHtml = true;
                mailMessage.To.Add(new MailAddress(recepientEmail));
                if (bcc != null)
                {
                    foreach (var b in bcc)
                    {
                        mailMessage.Bcc.Add(b);
                    }
                }
                SmtpClient smtp = new SmtpClient();
                smtp.Host = MailSettings.Host;
                smtp.EnableSsl = true;
                System.Net.NetworkCredential NetworkCred = new System.Net.NetworkCredential();
                NetworkCred.UserName = MailSettings.Email;
                NetworkCred.Password = MailSettings.Password;
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = NetworkCred;
                smtp.Port = MailSettings.Port;
                smtp.Send(mailMessage);
            }
        }
    }
}
