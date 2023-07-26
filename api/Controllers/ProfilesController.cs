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
  [Route("")]
  public async Task<ActionResult> GetProfileByUserLoginAsync([FromQuery] string login)
  {
    Guid principalId = IdentityUtils.GetPrincipalId(User);
    ProfileDTO profileDTO = await _profileService.GetProfileByUserLoginAsync(principalId, login);
    return Ok(profileDTO);
  }
}
