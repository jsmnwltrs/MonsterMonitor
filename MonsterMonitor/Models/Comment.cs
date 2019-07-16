using System;

namespace MonsterMonitor.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int SightingId { get; set; }
        public DateTime DateCreated { get; set; }
        public string Message { get; set; }
        public bool isAnon { get; set; }
    }
}
