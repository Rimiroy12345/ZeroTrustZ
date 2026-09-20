#include "AuthService.h"

#include <chrono>
#include <random>
#include <sstream>

std::string AuthService::createSession(const std::string& userId)
{
    const auto now =
        std::chrono::high_resolution_clock::now()
            .time_since_epoch()
            .count();

    std::mt19937_64 generator(
        static_cast<unsigned long long>(now)
    );

    std::uniform_int_distribution<unsigned long long> distribution;

    std::stringstream tokenStream;

    tokenStream
        << std::hex
        << distribution(generator)
        << distribution(generator);

    const std::string token = tokenStream.str();

    Session session;

    session.userId = userId;
    session.expiresAt =
        std::chrono::system_clock::now()
        + std::chrono::minutes(30);

    sessions[token] = session;

    return token;
}

bool AuthService::validateSession(
    const std::string& token,
    std::string& userId
)
{
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
    return sessions.erase(token) > 0;
}