using api.DTOs;
using api.Entities;

namespace api.Services.Interfaces;

public interface IProfileService
{
  public Task<Guid> GetProfileIdByLoginAsync(Guid principalId, string login);
  public Task<ProfileDTO> GetProfileByLoginAsync(Guid principalId, string login);
  public Task<ProfilePhoto> AddPhotoAsync(Guid principalId, IFormFile formFile);
  public Task<ProfileDTO> GetProfileDTOByIdAsync(Guid principalId, Guid userId);
}