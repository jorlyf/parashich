using api.Infrastructure;
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
  public async Task<string> UploadAvatarAsync([FromForm] IFormFile file)
  {
    Guid principalId = IdentityUtils.GetPrincipalId(User);
    string avatarUrl = await _profileSettingsService.UploadAvatarAsync(principalId, file);
    return avatarUrl;
  }

  [Authorize]
  [HttpPut]
  [Route("Avatar/{id}")]
  public async Task<string> SetAvatarPhotoIdAsync([FromRoute] string id) // set avatar photo id
  {
    Guid principalId = IdentityUtils.GetPrincipalId(User);
    throw new NotImplementedException();
  }
}
