using Microsoft.AspNetCore.Diagnostics;

namespace api.Infrastructure.Exceptions;

public static class ExceptionMiddleware
{
  public static Task HandleExceptionAsync(HttpContext context)
  {
    IExceptionHandlerFeature? contextFeature = context.Features.Get<IExceptionHandlerFeature>();
    Exception? exception = contextFeature?.Error;
    if (exception == null)
    {
      return null!;
    }

    ApiExceptionResponse exceptionResponse;
    if (exception is ApiException apiException)
    {
      exceptionResponse = new()
      {
        Status = apiException.Status,
        Message = apiException.Message
      };
      context.Response.StatusCode = apiException.Status;
    }
    else
    {
      exceptionResponse = new()
      {
        Status = 500,
        Message = "Внутренняя ошибка сервера"
      };
      context.Response.StatusCode = 500;
    }

    return context.Response.WriteAsync(exceptionResponse.ToString());
  }
}