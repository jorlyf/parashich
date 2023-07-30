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
  public async Task<ActionResult> CreatePrivateDialogAsync([FromBody] CreatePrivateDialogRequestDTO dto)
  {
    Guid userId = IdentityUtils.GetPrincipalId(User);
    await _dialogService.CreatePrivateDialogAsync(userId, Guid.Parse(dto.FirstUserId), Guid.Parse(dto.SecondUserId));
    return Ok();
  }

  [Authorize]
  [HttpGet]
  [Route("{id}")]
  public async Task<ActionResult<DialogDTO>> GetDialogDTOAsync(string id)
  {
    Guid userId = IdentityUtils.GetPrincipalId(User);
    DialogDTO dialogDTO = await _dialogService.GetDialogDTOAsync(userId, Guid.Parse(id));
    return Ok(dialogDTO);
  }
}
