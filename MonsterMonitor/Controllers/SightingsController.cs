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
        public ActionResult GetSightingsByUserId(int userId, bool isActive)
        {
            var sightings = _sightingRepository.GetByUserId(userId, isActive);

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

        [HttpGet("filterByLocation")]
        public ActionResult FilterResultsByLocation(List<Sighting> sightingList, string location)
        {
            var sightingResults = _sightingRepository.FilterLocation(sightingList, location);

            return Ok(sightingResults);
        }

        [HttpGet("filterByDate")]
        public ActionResult FilterResultsByDate(List<Sighting> sightingList, string date)
        {
            var sightingResults = _sightingRepository.FilterDate(sightingList, date);

            return Ok(sightingResults);
        }

        [HttpGet("filterByThreatLevel")]
        public ActionResult FilterResultsByThreatLevel(List<Sighting> sightingList, string threatLevel)
        {
            var sightingResults = _sightingRepository.FilterThreatLevel(sightingList, threatLevel);

            return Ok(sightingResults);
        }
    }
}