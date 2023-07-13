namespace api.Infrastructure.Exceptions;

public class ApiException : Exception
{
  public int Status { get; }
  public ApiException(int status, string? message = null) : base(message)
  {
    Status = status;
  }
}