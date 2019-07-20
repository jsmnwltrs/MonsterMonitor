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
    public class UserLikeRepository
    {
        readonly string _connectionString;

        public UserLikeRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public List<UserLike> GetAll()
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var userLikeList = db.Query<UserLike>(
                    @"select *
                    from UserLikes").ToList();

                return userLikeList;
            }

            throw new Exception("Found No UserLikes");
        }

        public List<UserLike> GetBySightingId(int sightingId)
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var userLikeList = db.Query<UserLike>(
                    @"select *
                    from UserLikes
                    where SightingId = @sightingId"
                    , new { sightingId }).ToList();

                return userLikeList;
            }

            throw new Exception("Found No UserLikes");
        }

        public List<UserLike> GetByUserId(int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var userLikeList = db.Query<UserLike>(
                    @"select *
                    from UserLikes
                    where UserId = @userId"
                    , new { userId }).ToList();

                return userLikeList;
            }

            throw new Exception("Found No UserLikes");
        }

        public UserLike GetBySightingIdAndUserId(int sightingId, int userId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var userLike = db.QueryFirstOrDefault<UserLike>(
                    @"select *
                    from UserLikes
                    where SightingId = @sightingId and UserId = @userId"
                    , new { sightingId, userId });

                if (userLike != null)
                {
                    return userLike;
                }
                
            }

            throw new Exception("Found No UserLikes");
        }

        public UserLike Add(int sightingId, int userId, bool isLiked)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var newUserLike = db.QueryFirstOrDefault<UserLike>(@"
                    Insert into UserLikes(SightingId, UserId, IsLiked)
                    Output inserted.*
                    Values(@sightingId, @userId, @isLiked)",
                    new { sightingId, userId, isLiked });

                if (newUserLike != null)
                {
                    return newUserLike;
                }
            }

            throw new Exception("Could not add UserLike");
        }

        public UserLike Update(int id, int sightingId, int userId, bool isLiked)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updatedUserLike = db.QueryFirstOrDefault<UserLike>(@"
                    update UserLikes
                    set SightingId = @sightingId,
                    UserId = @userId,
                    IsLiked = @isLiked
                    output inserted.*
                    where Id = @id",
                    new { sightingId, userId, isLiked, id });

                if (updatedUserLike != null)
                {
                    return updatedUserLike;
                }
            }

                throw new Exception("Could not update UserLike");
        }

        internal object Delete(int userLikeId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var deletedUserLike = db.QueryFirstOrDefault<UserLike>(@"
                    delete from UserLikes
                    output deleted.*
                    where Id = @userLikeId",
                    new { userLikeId });

                if (deletedUserLike != null)
                {
                    return deletedUserLike;
                }
            }

            throw new Exception("Could not delete UserLike");
        }
    }
}
