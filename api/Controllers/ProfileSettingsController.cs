using System.ComponentModel.DataAnnotations;
using api.DTOs;
using api.Infrastructure;
using api.Infrastructure.Exceptions;
using api.Services.Implementations;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProfileSettingsController : ControllerBase
{
  private readonly IProfileSettingsService _profileSettingsService;

  public ProfileSettingsController(ProfileSettingsService profileSettingsService)
  {
    _profileSettingsService = profileSettingsService;
  }

  [Authorize]
  [HttpPost]
  [Route("Avatar")]
  public async Task<ActionResult<string>> UploadAvatarAsync([FromForm] IFormFile file)
  {
    Guid principalId = IdentityUtils.GetPrincipalId(User);
    string avatarUrl = await _profileSettingsService.UploadAvatarAsync(principalId, file);
    return Ok(avatarUrl);
  }

  [Authorize]
  [HttpPut]
  [Route("Avatar/{id}")]
  public async Task<ActionResult<string>> SetAvatarPhotoIdAsync([FromRoute] string id)
  {
    Guid principalId = IdentityUtils.GetPrincipalId(User);
    string avatarUrl = await _profileSettingsService.SetAvatarIdAsync(principalId, Guid.Parse(id));
    return Ok(avatarUrl);
  }

  [Authorize]
  [HttpPut]
  [Route("Status")]
  public async Task<ActionResult> SetStatusAsync([FromBody] StatusChangeRequestDTO dto)
  {
    Guid principalId = IdentityUtils.GetPrincipalId(User);
    await _profileSettingsService.SetStatusAsync(principalId, dto.Status);
    return Ok();
  }
}
