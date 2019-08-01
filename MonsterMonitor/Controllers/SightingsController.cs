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
            var sightings = _sightingRepository.GetAll();

            return Ok(sightings);
        }

        [HttpGet("byIsActive/{isActive}")]
        public ActionResult GetSightingsByIsActiveId(bool isActive)
        {
            var sightings = _sightingRepository.GetByIsActiveId(isActive);

            return Ok(sightings);
        }

        [HttpGet("byUserId/{userId}")]
        public ActionResult GetSightingsByUserId(int userId)
        {
            var sightings = _sightingRepository.GetByUserId(userId);

            return Ok(sightings);
        }

        [HttpGet("byId/{sightingId}")]
        public ActionResult GetSightingById(int sightingId)
        {
            var sighting = _sightingRepository.GetById(sightingId);

            return Ok(sighting);
        }

        [HttpPost("add")]
        public ActionResult AddSighting(Sighting sightingObject)
        {
            var newSighting = _sightingRepository.Add(sightingObject);

            return Ok(newSighting);
        }

        [HttpPut("update")]
        public ActionResult UpdateSighting(Sighting sightingObject)
        {
            var updatedSighting = _sightingRepository.Update(sightingObject);

            return Ok(updatedSighting);
        }

        [HttpGet("filterByThreatLevel")]
        public ActionResult FilterResultsByThreatLevel(List<Sighting> sightingList, string threatLevel)
        {
            var sightingResults = _sightingRepository.FilterThreatLevel(sightingList, threatLevel);

            return Ok(sightingResults);
        }

        [HttpGet("sortByMostRecent")]
        public ActionResult SortResultsByMostRecent(List<Sighting> sightingList)
        {
            var sightingResults = _sightingRepository.SortMostRecent(sightingList);

            return Ok(sightingResults);
        }

        [HttpGet("sortByMostPopular")]
        public ActionResult SortResultsByMostPopular(List<Sighting> sightingList)
        {
            var sightingResults = _sightingRepository.SortMostPopular(sightingList);

            return Ok(sightingResults);
        }
    }
}