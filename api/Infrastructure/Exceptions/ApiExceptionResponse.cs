using System.Text.Json;

namespace api.Infrastructure.Exceptions;

public class ApiExceptionResponse
{
  public required int Status { get; set; }

  public string? Message { get; set; }

  public override string ToString()
    => JsonSerializer.Serialize(
      this,
      new JsonSerializerOptions
      {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase
      });
}