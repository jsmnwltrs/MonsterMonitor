using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MonsterMonitor.Data;
using MonsterMonitor.Models;
using MonsterMonitor.Modals;

namespace MonsterMonitor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        readonly UserRepository _userRepository;

        public UsersController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("all")]
        public ActionResult GetAllUsers()
        {
            var users = _userRepository.GetAll();

            return Ok(users);
        }

        [HttpGet("byId/{userId}")]
        public ActionResult GetUserById(int userId)
        {
            var user = _userRepository.GetById(userId);

            return Ok(user);
        }

        [HttpPost("add")]
        public ActionResult AddUser(User userObject)
        {
            var newUser = _userRepository.Add(userObject.Username, userObject.Email, userObject.ImageUrl, userObject.Location);

            return Ok(newUser);
        }

        [HttpPut("update")]
        public ActionResult UpdateUser(User userObject)
        {
            var updatedUser = _userRepository.Update(userObject.Id, userObject.Username, userObject.Email, userObject.ImageUrl, userObject.Location);

            return Ok(updatedUser);
        }
    }
}