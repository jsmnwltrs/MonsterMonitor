using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Options;
using MonsterMonitor.Modals;

namespace MonsterMonitor.Data
{
    public class UserRepository
    {
        readonly string _connectionString;

        public UserRepository(IOptions<DbConfiguration> dbConfig)
        {
            _connectionString = dbConfig.Value.ConnectionString;
        }

        public List<User> GetAll()
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var userList = db.Query<User>(
                    @"select *
                    from Users"
                ).ToList();

                return userList;
            }

            throw new NotImplementedException();
        }
    }
}
