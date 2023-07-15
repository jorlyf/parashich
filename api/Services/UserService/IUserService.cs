using api.DTOs;

namespace api.Services.Interfaces;

public interface IUserService
{
  public Task<UserDTO> GetUserDTOByIdAsync(Guid requesterUserId, Guid userId);
  public Task<List<UserDTO>> GetUserDTOByLoginContainsAsync(Guid requesterUserId, string login);
}