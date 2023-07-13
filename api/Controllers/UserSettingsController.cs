using api.Infrastructure;
using api.Services.Implementations;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserSettingsController : ControllerBase
{
  private readonly IUserSettingsService _userSettingsService;

  public UserSettingsController(UserSettingsService userSettingsService)
  {
    _userSettingsService = userSettingsService;
  }

  [Authorize]
  [HttpPost]
  [Route("ChangePassword")]
  public async Task<ActionResult> ChangePasswordAsync(string password)
  {
    Guid userId = IdentityUtils.GetAuthorizedUserId(User);
    await _userSettingsService.ChangePasswordAsync(userId, password);
    return Ok();
  }
}
