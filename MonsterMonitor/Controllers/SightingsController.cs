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
    public class SightingsController : ControllerBase
    {
        readonly SightingRepository _sightingRepository;

        public SightingsController(SightingRepository sightingRepository)
        {
            _sightingRepository = sightingRepository;
        }

        [HttpGet("all")]
        public ActionResult GetAllSightings()
        {
            var sightings = _sightingRepository.getAll();

            return Ok(sightings);
        }
    }
}