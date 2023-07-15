using api.DTOs;
using api.Infrastructure;
using api.Services.Implementations;
using api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DialogController : ControllerBase
{
  private readonly IDialogService _dialogService;

  public DialogController(DialogService dialogService)
  {
    _dialogService = dialogService;
  }

  [Authorize]
  [HttpPost]
  [Route("CreatePrivate")]
  public async Task<ActionResult> CreatePrivateDialogAsync([FromBody] CreatePrivateDialogRequestDTO dto)
  {
    Guid userId = IdentityUtils.GetAuthorizedUserId(User);
    await _dialogService.CreatePrivateDialogAsync(userId, Guid.Parse(dto.FirstUserId), Guid.Parse(dto.SecondUserId));
    return Ok();
  }

  [Authorize]
  [HttpGet]
  [Route("Get")]
  public async Task<ActionResult> GeteDialogDTOAsync(string id)
  {
    Guid userId = IdentityUtils.GetAuthorizedUserId(User);
    DialogDTO dialogDTO = await _dialogService.GetDialogDTOAsync(userId, Guid.Parse(id));
    return Ok(dialogDTO);
  }
}
