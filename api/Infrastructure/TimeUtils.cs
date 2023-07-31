namespace api.Infrastructure;

public static class TimeUtils
{
  public static DateTime UTCNow { get => DateTime.UtcNow; }
}

public static class DateTimeExtensions
{
  public static long GetTotalMilliseconds(this DateTime date)
  {
    return date.Ticks / TimeSpan.TicksPerMillisecond;
  }
}