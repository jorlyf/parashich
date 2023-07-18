using api.Entities;
using api.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TestController : ControllerBase
{
  private readonly UnitOfWork _UoW;

  public TestController(UnitOfWork uow)
  {
    _UoW = uow;
  }

  [HttpGet]
  [Route("test")]
  public async Task<ActionResult> test()
  {
    return Ok();
  }
}
