#pragma once

#include <chrono>
#include <mutex>
#include <string>
#include <unordered_map>

struct Session
{
    std::string userId;
    std::chrono::system_clock::time_point expiresAt;
};

class AuthService
{
private:
    std::unordered_map<std::string, Session> sessions;
    std::mutex sessionsMutex;

public:
    std::string createSession(const std::string& userId);

    bool validateSession(
        const std::string& token,
        std::string& userId
    );

    bool revokeSession(const std::string& token);
};
