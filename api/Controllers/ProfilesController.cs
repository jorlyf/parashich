using api.DTOs;
using api.Infrastructure;
using api.Services.Implementations;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProfilesController : ControllerBase
{
  private readonly IProfileService _profileService;

  public ProfilesController(ProfileService profileService)
  {
    _profileService = profileService;
  }

  [Authorize]
  [HttpGet]
  [Route("IdByLogin")]
  public async Task<ActionResult<Guid>> GetProfileIdByLoginAsync([FromQuery] string login)
  {
    Guid principalId = IdentityUtils.GetPrincipalId(User);
    Guid profileId = await _profileService.GetProfileIdByLoginAsync(principalId, login);
    return Ok(profileId);
  }

  [Authorize]
  [HttpGet]
  [Route("{id}")]
  public async Task<ActionResult<ProfileDTO>> GetProfileDTOByIdAsync([FromRoute] string id)
  {
    Guid principalId = IdentityUtils.GetPrincipalId(User);
    ProfileDTO profileDTO = await _profileService.GetProfileDTOByIdAsync(principalId, Guid.Parse(id));
    return Ok(profileDTO);
  }

  [Authorize]
  [HttpGet]
  [Route("")]
  public async Task<ActionResult<ProfileDTO>> GetProfileDTOByLoginAsync([FromQuery] string login)
  {
    Guid principalId = IdentityUtils.GetPrincipalId(User);
    ProfileDTO profileDTO = await _profileService.GetProfileByLoginAsync(principalId, login);
    return Ok(profileDTO);
  }
}
