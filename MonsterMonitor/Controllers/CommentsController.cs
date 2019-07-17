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
    public class CommentsController : ControllerBase
    {
        readonly CommentRepository _commentRepository;

        public CommentsController(CommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet("all")]
        public ActionResult GetAllComments()
        {
            var comments = _commentRepository.GetAll();

            return Ok(comments);
        }
    }
}