using System;

namespace MonsterMonitor.Models
{
    public class Sighting
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string VideoUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public int Rating { get; set; }
        public string ThreatLevel { get; set; }
        public bool IsActive { get; set; }
        public bool IsAnon { get; set; }
    }
}
