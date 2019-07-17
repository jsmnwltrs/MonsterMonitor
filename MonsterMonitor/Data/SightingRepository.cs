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

        public List<Sighting> getAll()
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var sightingList = db.Query<Sighting>(
                    @"select *
                    from Sightings").ToList();

                return sightingList;
            }
            throw new NotImplementedException();
        }
    }
}
