using api.DTOs;
using api.Infrastructure;
using api.Services.Implementations;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SearchController : ControllerBase
{
  private readonly IUserService _userService;

  public SearchController(UserService userService)
  {
    _userService = userService;
  }

  [Authorize]
  [HttpGet]
  [Route("Users/{id}")]
  public async Task<ActionResult> SearchUsersByIdAsync([FromRoute] string id)
  {
    Guid userId = IdentityUtils.GetPrincipalId(User);
    UserDTO userDTO = await _userService.GetUserDTOByIdAsync(userId, Guid.Parse(id));
    return Ok(userDTO);
  }

  [Authorize]
  [HttpGet]
  [Route("Users")]
  public async Task<ActionResult> SearchUsersByLoginAsync([FromQuery] string login)
  {
    Guid userId = IdentityUtils.GetPrincipalId(User);
    List<UserDTO> userDTOs = await _userService.GetUserDTOByLoginContainsExceptPrincipalUserAsync(userId, login);
    return Ok(userDTOs);
  }
}
