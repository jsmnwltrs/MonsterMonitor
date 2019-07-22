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
                    @"insert into Sightings(UserId, Title, Location, Description, ImageUrl, VideoUrl, DateCreated, ThreatLevel, IsActive, IsAnon)
                    output inserted.*
                    values(@userId, @title, @location, @description, @imageUrl, @videoUrl, @dateCreated, @threatLevel, @isActive, @isAnon)",
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
                    IsAnon = @isAnon
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
    }
}
