#include "AuthService.h"

#include <iomanip>
#include <random>
#include <sstream>

namespace
{
std::string generateSecureToken()
{
    std::random_device randomDevice;
    std::ostringstream tokenStream;

    tokenStream << std::hex << std::setfill('0');

    // 32 random bytes = 256-bit session token.
    for (int i = 0; i < 32; ++i)
    {
        const unsigned int byte =
            static_cast<unsigned int>(randomDevice()) & 0xFFU;

        tokenStream << std::setw(2) << byte;
    }

    return tokenStream.str();
}
}

std::string AuthService::createSession(const std::string& userId)
{
    const std::string token = generateSecureToken();

    Session session;
    session.userId = userId;
    session.expiresAt =
        std::chrono::system_clock::now()
        + std::chrono::minutes(30);

    {
        std::lock_guard<std::mutex> lock(sessionsMutex);
        sessions[token] = session;
    }

    return token;
}

bool AuthService::validateSession(
    const std::string& token,
    std::string& userId
)
{
    std::lock_guard<std::mutex> lock(sessionsMutex);

    const auto iterator = sessions.find(token);

    if (iterator == sessions.end())
        return false;

    if (std::chrono::system_clock::now() >
        iterator->second.expiresAt)
    {
        sessions.erase(iterator);
        return false;
    }

    userId = iterator->second.userId;
    return true;
}

bool AuthService::revokeSession(const std::string& token)
{
    std::lock_guard<std::mutex> lock(sessionsMutex);
    return sessions.erase(token) > 0;
}
