using System.Security.Claims;

namespace api.Infrastructure;

public static class IdentityUtils
{
  public static Guid GetPrincipalId(ClaimsPrincipal user)
  {
    return Guid.Parse(user.Claims.First(x => x.Type == "id").Value);
  }
}