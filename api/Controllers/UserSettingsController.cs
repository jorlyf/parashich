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
  [HttpPut]
  [Route("Password")]
  public async Task<ActionResult> ChangePasswordAsync([FromBody] string password)
  {
    Guid principalId = IdentityUtils.GetPrincipalId(User);
    await _userSettingsService.ChangePasswordAsync(principalId, password);
    return Ok();
  }
}
