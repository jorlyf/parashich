using api.DTOs;

namespace api.Services.Interfaces;

public interface IUserService
{
  public Task<UserDTO> GetUserDTOByIdAsync(Guid principalUserId, Guid userId);
  public Task<List<UserDTO>> GetUserDTOByLoginContainsExceptPrincipalUserAsync(Guid principalUserId, string login);
}