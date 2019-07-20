using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MonsterMonitor.Models
{
    public class UserLike
    {

        public int Id { get; set; }
        public int SightingId { get; set; }
        public int UserId { get; set; }
        public bool IsLiked { get; set; }

    }
}
