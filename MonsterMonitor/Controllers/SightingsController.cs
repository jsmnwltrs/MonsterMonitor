﻿using System;
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
        public ActionResult GetSightingsByIsActive(bool isActive)
        {
            var sightings = _sightingRepository.GetByIsActive(isActive);

            return Ok(sightings);
        }

        [HttpGet("byUserId/{userId}")]
        public ActionResult GetSightingsByUserId(int userId)
        {
            var sightings = _sightingRepository.GetByUserId(userId);

            return Ok(sightings);
        }

        [HttpGet("byUserIdAndIsActive/{userId}/{isActive}")]
        public ActionResult GetSightingsByUserIdAndIsActive(int userId, bool isActive)
        {
            var sightings = _sightingRepository.GetByUserIdAndIsActive(userId, isActive);

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

        [HttpGet("filterByThreatLevel/{threatLevel}")]
        public ActionResult FilterResultsByThreatLevel(string threatLevel)
        {
            var sightingResults = _sightingRepository.FilterThreatLevel(threatLevel);

            return Ok(sightingResults);
        }

        [HttpGet("mostRecentSightings")]
        public ActionResult getMostRecentSightings()
        {
            var sightingResults = _sightingRepository.MostRecent();

            return Ok(sightingResults);
        }

        [HttpGet("mostPopularSightings")]
        public ActionResult getMostPopularSightings()
        {
            var sightingResults = _sightingRepository.MostPopular();

            return Ok(sightingResults);
        }
    }
}