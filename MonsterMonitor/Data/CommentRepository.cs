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
    public class CommentRepository
    {
        readonly string _connectionString;

        public CommentRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public List<Comment> GetAll()
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var commentList = db.Query<Comment>(
                    @"select *
                    from Comments").ToList();

                return commentList;
            }

            throw new Exception("No Comments Found");
        }

        public List<Comment> GetByUserId(int userId)
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var commentList = db.Query<Comment>(
                    @"select *
                    from Comments
                    where UserId = @userId",
                    new { userId }).ToList();

                return commentList;
            }

            throw new Exception("No Comments Found");
        }

        public List<Comment> GetBySightingId(int sightingId)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var commentList = db.Query<Comment>(
                    @"select *
                    from Comments
                    where SightingId = @sightingId",
                    new { sightingId }).ToList();

                return commentList;
            }

            throw new Exception("No Comments Found");
        }

        public Comment Add(Comment commentObject)
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var newComment = db.QueryFirstOrDefault<Comment>(
                    @"insert into Comments(UserId, SightingId, DateCreated, Message, IsAnon)
                    output inserted.*
                    values(@userId, @sightingId, @dateCreated, @message, @isAnon)",
                    commentObject);

                if (newComment != null)
                {
                    return newComment;
                }
            }

            throw new Exception("Comment did not add");
        }

        public Comment Update(Comment commentObject)
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var updatedComment = db.QueryFirstOrDefault<Comment>(
                    @"update Comments
                    set UserId = @userId,
                    SightingId = @sightingId,
                    DateCreated = @dateCreated,
                    Message = @message,
                    IsAnon = @isAnon
                    output inserted.*
                    where Id = @id",
                    commentObject);

                if (updatedComment != null)
                {
                    return updatedComment;
                }
            }

            throw new Exception("Comment did not update");
        }

        public Comment Delete(int commentId)
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var deletedComment = db.QueryFirstOrDefault<Comment>(
                    @"delete from Comments
                    output deleted.*
                    where Id = @commentId",
                    new { commentId });

                if (deletedComment != null)
                {
                    return deletedComment;
                }
            }

            throw new Exception("Comment did not delete");
        }
    }
}
