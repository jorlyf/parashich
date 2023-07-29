using api.DTOs;

namespace api.Services.Interfaces;

public interface IProfileSearchService
{
  public Task<List<ProfileSearchResponseDTO>> GetProfileSearchResponseDTOByLoginContainsExceptPrincipalProfileAsync(Guid principalId, string login);
}