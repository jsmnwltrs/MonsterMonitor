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

            throw new NotImplementedException();
        }
    }
}
