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
    }
}