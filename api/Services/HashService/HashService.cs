using System.Security.Cryptography;
using System.Text;
using api.Services.Interfaces;

namespace api.Services.Implementations;

public class HashService : IHashService
{
  public string GetHash(string value)
  {
    byte[] hashedBuffer = SHA256.HashData(Encoding.UTF8.GetBytes(value));
    return Encoding.UTF8.GetString(hashedBuffer);
  }
}