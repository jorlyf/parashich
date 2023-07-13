using api.DTOs;
using api.Services.Implementations;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
  private readonly IAuthService _authService;

  public AuthController(AuthService authService)
  {
    _authService = authService;
  }

  [HttpPost]
  [Route("Login")]
  public async Task<ActionResult<string>> LoginAsync([FromBody] LoginDataDTO loginData)
  {
    string token = await _authService
      .LoginAsync(loginData.Login, loginData.Password);

    return Ok(token);
  }
  
  [HttpPost]
  [Route("Register")]
  public async Task<ActionResult<string>> RegisterAsync([FromBody] LoginDataDTO loginData)
  {
    string token = await _authService
      .RegisterAsync(loginData.Login, loginData.Password);

    return Ok(token);
  }

  [Authorize]
  [HttpPost]
  [Route("TokenLogin")]
  public ActionResult TokenLogin()
  {
    return Ok();
  }
}
