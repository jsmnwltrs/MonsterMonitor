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

        [HttpGet("byUserId/{userId}")]
        public ActionResult GetCommentsByUserId(int userId)
        {
            var comments = _commentRepository.GetByUserId(userId);

            return Ok(comments);
        }

        [HttpGet("bySightingId/{sightingId}")]
        public ActionResult GetCommentsBySightingId(int sightingId)
        {
            var comments = _commentRepository.GetBySightingId(sightingId);

            return Ok(comments);
        }

        [HttpPost("add")]
        public ActionResult AddComment(Comment commentObject)
        {
            var newComment = _commentRepository.Add(commentObject.UserId, commentObject.SightingId, commentObject.DateCreated, commentObject.Message, commentObject.IsAnon);

            return Ok(newComment);
        }

        [HttpPut("update")]
        public ActionResult UpdateComment(Comment commentObject)
        {
            var updatedComment = _commentRepository.Update(commentObject.Id, commentObject.UserId, commentObject.SightingId, commentObject.DateCreated, commentObject.Message, commentObject.IsAnon);

            return Ok(updatedComment);
        }

        [HttpDelete("delete/{commentId}")]
        public ActionResult DeleteComment(int commentId)
        {
            var deletedComment = _commentRepository.Delete(commentId);

            return Ok(deletedComment);
        }
    }
}