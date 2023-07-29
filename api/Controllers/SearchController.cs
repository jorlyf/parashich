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
  private readonly IProfileSearchService _profileSearchService;

  public SearchController(ProfileSearchService profileSearchService)
  {
    _profileSearchService = profileSearchService;
  }

  [Authorize]
  [HttpGet]
  [Route("Profiles")]
  public async Task<ActionResult> SearchUsersByLoginAsync([FromQuery] string login)
  {
    Guid principalId = IdentityUtils.GetPrincipalId(User);
    List<ProfileSearchResponseDTO> searchResults = await _profileSearchService.GetProfileSearchResponseDTOByLoginContainsExceptPrincipalProfileAsync(principalId, login);
    return Ok(searchResults);
  }
}
