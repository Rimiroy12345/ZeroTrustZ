#include "User.h"

User::User(
    const std::string& id,
    const std::string& username,
    const std::string& role
)
    : id(id),
      username(username),
      role(role),
      authenticated(false),
      trustScore(0)
{
}

const std::string& User::getId() const
{
    return id;
}

const std::string& User::getUsername() const
{
    return username;
}

const std::string& User::getRole() const
{
    return role;
}

bool User::isAuthenticated() const
{
    return authenticated;
}

int User::getTrustScore() const
{
    return trustScore;
}

void User::setAuthenticated(bool status)
{
    authenticated = status;
}

void User::setTrustScore(int score)
{
    if (score < 0)
        trustScore = 0;
    else if (score > 100)
        trustScore = 100;
    else
        trustScore = score;
}