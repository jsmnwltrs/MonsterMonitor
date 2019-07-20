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

            throw new NotImplementedException();
        }
    }
}
