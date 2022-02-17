using Core.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Web;
using System.Xml;

namespace Core.Utils
{
    public class UIHelper
    {
        public static readonly Assembly CurrentActionAssembly = Assembly.GetExecutingAssembly();
        public static DateTime MinDateTime = new DateTime(1980, 1, 1);

        public static string EncodeTitle(object sample)
        {
            return HttpUtility.HtmlEncode(sample).Replace("'", "&#39;").Replace("\"", "&quot;");
        }
        public static string FormatMoney(object money)
        {
            return String.Format("{0:0,0}", money).Replace(",", ".");
        }

        public static string GetOnlyTime(object yourDate, bool includeSeconds = false)
        {
            if (includeSeconds)
                return Utility.ConvertToDateTime(yourDate).ToString("HH:mm:ss");
            return Utility.ConvertToDateTime(yourDate).ToString("HH:mm");
        }
        public static string GetOnlyDate(object dt, string symbol = null)
        {
            var dateTime = Convert.ToDateTime(dt);
            if (symbol == null)
            {
                return string.Format("{0}/{1}/{2}", dateTime.Day, dateTime.Month, dateTime.Year);
            }
            else
            {
                var frameFormat = "{0}" + symbol + "{1}" + symbol + "{2}";
                return string.Format(frameFormat, dateTime.Day, dateTime.Month, dateTime.Year);
            }
        }
        public static string GetDayOfWeek(object dt)
        {
            if (dt == null) return "";

            var dateTime = Convert.ToDateTime(dt);
            if (dateTime <= MinDateTime)
            {
                return "-";
            }
            var dw = string.Empty;
            switch (dateTime.DayOfWeek)
            {
                case DayOfWeek.Monday:
                    dw = "Thứ Hai";
                    break;
                case DayOfWeek.Tuesday:
                    dw = "Thứ Ba";
                    break;
                case DayOfWeek.Wednesday:
                    dw = "Thứ Tư";
                    break;
                case DayOfWeek.Thursday:
                    dw = "Thứ Năm";
                    break;
                case DayOfWeek.Friday:
                    dw = "Thứ Sáu";
                    break;
                case DayOfWeek.Saturday:
                    dw = "Thứ Bảy";
                    break;
                case DayOfWeek.Sunday:
                    dw = "Chủ Nhật";
                    break;
            }
            return dw;
        }
        public static string GetTimeAgo(DateTime yourDate)
        {
            const int SECOND = 1;
            const int MINUTE = 60 * SECOND;
            const int HOUR = 60 * MINUTE;
            const int DAY = 24 * HOUR;
            const int MONTH = 30 * DAY;

            var ts = new TimeSpan(DateTime.Now.Ticks - yourDate.Ticks);
            double delta = Math.Abs(ts.TotalSeconds);

            if (delta < 1 * MINUTE)
                return ts.Seconds == 1 ? "1 giây trước" : ts.Seconds + " giây trước";

            if (delta < 2 * MINUTE)
                return "1 phút trước";

            if (delta < 45 * MINUTE)
                return ts.Minutes + " phút trước";

            if (delta < 90 * MINUTE)
                return "1 giờ trước";

            if (delta < 24 * HOUR)
                return ts.Hours + " giờ trước";

            if (delta < 48 * HOUR)
                return "hôm qua";

            if (delta < 30 * DAY)
                return ts.Days + " ngày trước";

            if (delta < 12 * MONTH)
            {
                int months = Convert.ToInt32(Math.Floor((double)ts.Days / 30));
                return months <= 1 ? "1 tháng trước" : months + " tháng trước";
            }
            else
            {
                int years = Convert.ToInt32(Math.Floor((double)ts.Days / 365));
                return years <= 1 ? "1 năm trước" : years + " năm trước";
            }
        }

        public static string GetCourseUrl(object courseId)
        {
            if (Utility.ConvertToInt(courseId) > 0)
            {
                return "/course/detail-c" + courseId + ".htm";
            }
            else
            {
                return "javascript:void(0)";
            }
        }
        public static string GetFullDate(object dt)
        {
            if (dt == null) return "";
            var dateTime = Convert.ToDateTime(dt);
            if (dateTime <= MinDateTime) return "-";
            return string.Format("{0}/{1}/{2} {3}:{4}", dateTime.Day, dateTime.Month, dateTime.Year, dateTime.Hour,
                dateTime.Minute > 10 ? dateTime.Minute + "" : ("0" + dateTime.Minute));
        }
        public static string GetLongDate(object dt)
        {
            if (dt == null) return "";
            var dateTime = Convert.ToDateTime(dt);
            if (dateTime <= MinDateTime) return "-";
            return string.Format("{3} - {0}/{1}/{2}", dateTime.Day, dateTime.Month, dateTime.Year, GetDayOfWeek(dt));
        }
        public static DateTime GetStartOfYear(DateTime dateTime)
        {
            return new DateTime(dateTime.Year, 1, 1, 0, 0, 0, 0);
        }
        public static DateTime GetEndOfYear(DateTime dateTime)
        {
            return new DateTime(dateTime.Year, 12, 31, 23, 59, 59, 999);
        }
        public static DateTime GetStartOfDay(DateTime dateTime)
        {
            return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day, 0, 0, 0, 0);
        }
        public static DateTime GetEndOfDay(DateTime dateTime)
        {
            return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day, 23, 59, 59, 999);
        }
        public static string ConvertToDateTimePicker(object datetime, bool isReturnNow = false)
        {
            if (datetime == null)
            {
                if (isReturnNow)
                {
                    datetime = DateTime.Now;
                }
                else
                {
                    datetime = DateTime.MinValue;
                }
            }
            DateTime dt = DateTime.Parse(datetime.ToString());
            if (dt == DateTime.MinValue)
            {
                if (isReturnNow)
                {
                    dt = DateTime.Now;
                }
                else
                {
                    return "";
                }
            }

            return dt.ToString("dd/MM/yyyy HH:mm");
        }

        public static string ThumbImage(object avatar, int width, int height, bool crop = true)
        {
            var img = avatar + "";
            if (string.IsNullOrEmpty(img) || img.StartsWith("http")) return img;

            var thumb = $"{AppSettings.StorageDomain}/{img.TrimStart('/')}?w={width}";
            if (height > 0)
                thumb += $"&h={height}";
            if (crop)
                thumb += "mode=crop";
            return thumb;
        }
        public static string GetUserAvatar(object _fullName, object _avatar, object _userId = null, bool imgTag = true, bool hoverAble = false, int w = 0, string classOther = "")
        {
            try
            {
                var avatar = _avatar + "";
                if (avatar.StartsWith("/web_image/")) return "<img src=\"" + _avatar + "\"/>";
                var fullName = _fullName + "";
                fullName = fullName.Trim();
                if (string.IsNullOrEmpty(avatar))
                {
                    var nameA = (fullName + "").Split(new[] { ' ' });
                    var name = "";
                    int i = 0;
                    foreach (var n in nameA)
                    {
                        name += (n.ToCharArray()[0] + "").ToUpper();
                        if (i < nameA.Length - 1)
                        {
                            name += ".";
                        }
                        i++;
                    }
                    if (name[0] == name[name.Length - 1])
                    {
                        name = name[0] + "";
                    }
                    else
                    {
                        name = name[0] + "" + name[name.Length - 1];
                    }
                    name = Utility.UnicodeToKoDau(name).ToUpper();
                    if (!imgTag)
                    {
                        avatar = "DekiruCharAvatar://" + name;
                    }
                    else
                    {
                        avatar = string.Format("<img alt=\"" + fullName + "\" class='DekiruCharAvatar DekiruMemberAvatar {1}' data-name='{0}' data-member=\"" + _userId + "\"/>", name, classOther);
                    }
                }
                else if (!avatar.StartsWith("http"))
                {
                    if (!imgTag)
                    {
                        avatar = "/Proxy/ImageProxy.ashx?url=" + HttpUtility.UrlEncode(AppSettings.StorageDomain + avatar + (w == 0 ? "?w=75&h=75&mode=crop" : string.Format("?w={0}&h={0}&mode=crop", w)));
                    }
                    else
                    {
                        avatar = string.Format("<img src='/Proxy/ImageProxy.ashx?url={0}' class=\"DekiruMemberAvatar {1}\" data-member=\"" + _userId + "\"/>", HttpUtility.UrlEncode(AppSettings.StorageDomain + avatar + (w == 0 ? "?w=100&h=100&mode=crop" : string.Format("?w={0}&h={0}&mode=crop", w))), classOther);
                    }
                }
                else
                {
                    if (!imgTag)
                    {
                        //avatar = string.Format("<img src='{0}'/>", avatar);
                        return avatar;
                    }
                    else
                    {
                        avatar = string.Format("<img src='/Proxy/ImageProxy.ashx?url={0}' class=\"DekiruMemberAvatar {1}\" data-member=\"" + _userId + "\"/>", HttpUtility.UrlEncode(avatar), classOther);
                    }
                }
                if (!imgTag)
                {
                    return avatar;
                }
                else
                {
                    return "<div class=\"DekiruMemberAvatarWrapper" + (hoverAble ? " HoverAble" : "") + "\">" + avatar + "</div>";
                }
            }
            catch (Exception ex)
            {
                if (!imgTag)
                {
                    return "";
                }
                else
                {
                    return "<div class=\"DekiruMemberAvatarWrapper" + (hoverAble ? " HoverAble" : "") + "\"><img class=\"DekiruMemberAvatar" + classOther + "\" src=\"\" alt=\"" + _fullName + "\" data-member=\"" + _userId + "\"/></div>";
                }
            }
        }
    }
    public static class UIHelperStatic
    {
        private static Random rng = new Random();
        public static void Shuffle<T>(this IList<T> list)
        {
            int n = list.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                T value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
        }

        public static List<T> FormatAvatar<T>(this List<T> list, int width = 50, int height = 50)
        {
            foreach (dynamic o in list)
            {
                o.Avatar = UIHelper.ThumbImage(o.Avatar, width, height);
            }
            return list;
        }
        public static string FormatAvatar(this string o, int width = 50, int height = 50)
        {
            return UIHelper.ThumbImage(o, width, height);
        }
    }
}
