using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Options;
using MonsterMonitor.Models;

namespace MonsterMonitor.Data
{
    public class SightingRepository
    {
        readonly string _connectionString;

        public SightingRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public List<Sighting> GetAll()
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var sightingList = db.Query<Sighting>(
                    @"select *
                    from Sightings").ToList();

                return sightingList;
            }
            throw new Exception("No Sightings Found");
        }

        public List<Sighting> GetByUserId(int userId)
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var sightingList = db.Query<Sighting>(
                    @"select *
                    from Sightings
                    where UserId = @userId",
                    new { userId }).ToList();

                return sightingList;
            }

            throw new Exception("No Sightings Found");
        }

        public List<Sighting> GetByIsActive(bool isActive)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sightingList = db.Query<Sighting>(
                    @"select *
                    from Sightings
                    where IsActive = @isActive
                    order by DateCreated desc",
                    new { isActive }).ToList();

                return sightingList;
            }

            throw new Exception("No Sightings Found");
        }

        public Sighting GetById(int sightingId)
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var sighting = db.QueryFirstOrDefault<Sighting>(
                    @"select *
                    from Sightings
                    where Id = @sightingId",
                    new { sightingId });

                if (sighting != null)
                {
                    return sighting;
                }
            }

            throw new Exception("No Sightings Found");
        }

        public Sighting Add(Sighting sightingObject)
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var newSighting = db.QueryFirstOrDefault<Sighting>(
                    @"insert into Sightings(UserId, Title, Location, Description, ImageUrl, VideoUrl, DateCreated, ThreatLevel, IsActive, IsAnon, Latitude, Longitude)
                    output inserted.*
                    values(@userId, @title, @location, @description, @imageUrl, @videoUrl, @dateCreated, @threatLevel, @isActive, @isAnon, @latitude, @longitude)",
                    sightingObject);

                if (newSighting != null)
                {
                    return newSighting;
                }
            }

            throw new Exception("Sighting did not add");
        }

        public Sighting Update(Sighting sightingObject)
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var updatedSighting = db.QueryFirstOrDefault<Sighting>(
                    @"update Sightings
                    set UserId = @userId,
                    Title = @title,
                    Location = @location,
                    Description = @description,
                    ImageUrl = @imageUrl,
                    VideoUrl = @videoUrl,
                    DateCreated = @dateCreated,
                    ThreatLevel = @threatlevel,
                    IsActive = @isActive,
                    IsAnon = @isAnon,
                    Latitude = @latitude,
                    Longitude = @longitude
                    output inserted.*
                    where Id = @id",
                    sightingObject);

                if (updatedSighting != null)
                {
                    return updatedSighting;
                }
            }

            throw new Exception("Sighting did not update");
        }

        public List<Sighting> GetByUserIdAndIsActive(int userId, bool isActive)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sightingList = db.Query<Sighting>(
                    @"select *
                    from Sightings
                    where UserId = @userId and IsActive = @isActive
                    order by DateCreated desc",
                    new { userId, isActive }).ToList();

                return sightingList;
            }

            throw new Exception("No Sightings Found");
        }

        public List<Sighting> MostPopular()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var userLikeList = db.Query<UserLike>(
                   @"select *
                    from UserLikes").ToList();

                var sightingList = db.Query<Sighting>(
                    @"select *
                    from Sightings
                    where IsActive = 'true'
                    order by DateCreated desc").ToList();

                foreach (var sighting in sightingList)
                {
                    var matchingUserLikes = userLikeList.Where(userLike => userLike.SightingId == sighting.Id).ToList();

                    var totalLikes = 0;
                    var totalDislikes = 0;

                    foreach (var userLike in matchingUserLikes)
                    {
                        if (userLike.IsLiked)
                        {
                            totalLikes++;
                        } else
                        {
                            totalDislikes++;
                        }
                    }

                    sighting.Rating = totalLikes - totalDislikes;
                }

                var sortedSightings = sightingList.OrderByDescending(sighting => sighting.Rating).Take(5).ToList();

                return sortedSightings;
            }

            throw new Exception("No Sightings Found");
        }

        public List<Sighting> MostRecent()
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sightingList = db.Query<Sighting>(
                    @"select top (5) *
                    from Sightings
                    where IsActive = 'true'
                    order by DateCreated desc").ToList();

                return sightingList;
            }

            throw new Exception("No Sightings Found");
        }

        public List<Sighting> FilterThreatLevel(string threatLevel)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var sightingList = db.Query<Sighting>(
                    @"select *
                    from Sightings
                    where IsActive = 'true' and ThreatLevel = @threatLevel
                    order by DateCreated desc",
                    new { threatLevel }).ToList();

                return sightingList;
            }

            throw new Exception("No Sightings Found");
        }
    }
}
