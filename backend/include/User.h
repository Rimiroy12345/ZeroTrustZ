#pragma once

#include <string>

class User
{
private:
    std::string id;
    std::string username;
    std::string role;
    bool authenticated;
    int trustScore;

public:
    User(
        const std::string& id,
        const std::string& username,
        const std::string& role
    );

    const std::string& getId() const;
    const std::string& getUsername() const;
    const std::string& getRole() const;

    bool isAuthenticated() const;
    int getTrustScore() const;

    void setAuthenticated(bool status);
    void setTrustScore(int score);
};