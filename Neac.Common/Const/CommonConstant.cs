﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Neac.Common.Const
{
    public static class CommonConstant
    {
        public enum DocumentState
        {
            NotHad = 0,
            Had = 1,
            Edited = 2
        }
        public enum UserPositionStatusEnum
        {
            NoActive,
            Active
        }
    }
    public static class UserStatus
    {
        public const int Locked = 0;
        public const int Working = 1;
    }
    public static class MeetRoomStatus
    {
        public const int Offline = 0;
        public const int Online = 1;
    }
    public static class ProjectState
    {
        public const int Excuting = 0;
        public const int Excuted = 1;
    }
    public static class PositionState
    {
        public const int Deactived = 0;
        public const int Active = 1;
    }
}
