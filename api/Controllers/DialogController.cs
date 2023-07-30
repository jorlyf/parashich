using api.DTOs;
using api.Infrastructure;
using api.Services.Implementations;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DialogsController : ControllerBase
{
  private readonly IDialogService _dialogService;

  public DialogsController(DialogService dialogService)
  {
    _dialogService = dialogService;
  }

  [Authorize]
  [HttpPost]
  [Route("/Private/{id}")]
  public async Task<ActionResult> CreatePrivateDialogAsync([FromRoute] string id)
  {
    Guid principalId = IdentityUtils.GetPrincipalId(User);
    await _dialogService.CreatePrivateDialogAsync(principalId, Guid.Parse(id));
    return Ok();
  }

  [Authorize]
  [HttpGet]
  [Route("{id}")]
  public async Task<ActionResult<DialogDTO>> GetDialogDTOAsync(string id)
  {
    Guid principalId = IdentityUtils.GetPrincipalId(User);
    DialogDTO dialogDTO = await _dialogService.GetDialogDTOAsync(principalId, Guid.Parse(id));
    return Ok(dialogDTO);
  }
}
