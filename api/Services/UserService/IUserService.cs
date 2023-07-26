using api.DTOs;

namespace api.Services.Interfaces;

public interface IUserService
{
  public Task<UserDTO> GetUserDTOByIdAsync(Guid principalId, Guid userId);
  public Task<List<UserDTO>> GetUserDTOByLoginContainsExceptPrincipalUserAsync(Guid principalId, string login);
}