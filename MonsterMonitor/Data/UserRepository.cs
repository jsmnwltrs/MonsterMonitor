﻿using System;
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

        public User GetById(int userId)
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var user = db.QueryFirstOrDefault<User>(
                    @"select *
                    from Users
                    where Id = @userId",
                    new { userId });

                if (user != null)
                {
                    return user;
                }
            }

            throw new Exception("User not Found");
        }

        public User Add(User userObject)
        {
            using(var db = new SqlConnection(_connectionString))
            {
                var newUser = db.QueryFirstOrDefault<User>(
                    @"insert into Users(Username, Email, ImageUrl, Location)
                    output inserted.*
                    values(@username, @email, @imageUrl, @location)",
                    userObject);

                if (newUser != null)
                {
                    return newUser;
                }
            }

            throw new Exception("User did not add");
        }

        public User Update(User userObject)
        {
            using (var db = new SqlConnection(_connectionString))
            {
                var updatedUser = db.QueryFirstOrDefault<User>(
                    @"update Users
                    set Username = @username,
                    Email = @email,
                    ImageUrl = @imageUrl,
                    Location = @location
                    output inserted.*
                    where Id = @id",
                    userObject);

                if (updatedUser != null)
                {
                    return updatedUser;
                }
            }

            throw new Exception("User did not update");
        }
    }
}
