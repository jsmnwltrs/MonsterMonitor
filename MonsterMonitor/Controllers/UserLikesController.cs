using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using MonsterMonitor.Data;
using MonsterMonitor.Models;

namespace MonsterMonitor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLikesController : ControllerBase
    {
        readonly UserLikeRepository _userLikeRepository;

        public UserLikesController(UserLikeRepository userLikeRepository)
        {
            _userLikeRepository = userLikeRepository;
        }

        [HttpGet("all")]
        public ActionResult GetAllUserLikes()
        {
            var userLikes = _userLikeRepository.GetAll();

           return Ok(userLikes);
        }

        [HttpGet("bySightingId/{sightingId}")]
        public ActionResult GetUserLikesBySightingId(int sightingId)
        {
            var userLikes = _userLikeRepository.GetBySightingId(sightingId);

            return Ok(userLikes);
        }

        [HttpGet("byUserId/{userId}")]
        public ActionResult GetUserLikesByUserId(int userId)
        {
            var userLikes = _userLikeRepository.GetByUserId(userId);

            return Ok(userLikes);
        }

        [HttpGet("bySightingIdAndUserId/{sightingId}/{userId}")]
        public ActionResult GetUserLikeBySightingIdAndUserId(int sightingId, int userId)
        {
            var userLike = _userLikeRepository.GetBySightingIdAndUserId(sightingId, userId);

            return Ok(userLike);
        }

        [HttpPost("add")]
        public ActionResult AddUserLike(UserLike userLikeObject)
        {
            var newUserLike = _userLikeRepository.Add(userLikeObject.SightingId, userLikeObject.UserId, userLikeObject.IsLiked);

            return Ok(newUserLike);
        }

        [HttpPut("update")]
        public ActionResult UpdateUserLike(UserLike userLikeObject)
        {
            var updatedUserLike = _userLikeRepository.Update(userLikeObject.Id, userLikeObject.SightingId, userLikeObject.UserId, userLikeObject.IsLiked);

            return Ok(updatedUserLike);
        }

        [HttpDelete("delete/{userLikeId}")]
        public ActionResult DeleteUserLike(int userLikeId)
        {
            var deletedUserLike = _userLikeRepository.Delete(userLikeId);

            return Ok(deletedUserLike);
        }
    }
}