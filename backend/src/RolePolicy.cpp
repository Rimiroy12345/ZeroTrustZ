#include "RolePolicy.h"

bool RolePolicy::evaluate(
    const User& user,
    const AccessRequest& request,
    std::string& reason
) const
{
    if (!user.isAuthenticated())
    {
        reason = "Access denied: user is not authenticated.";
        return false;
    }

    if (user.getId() != request.getUserId())
    {
        reason = "Access denied: user identity does not match request identity.";
        return false;
    }

    if (user.getTrustScore() < getMinimumUserTrustScore())
    {
        reason =
            "Access denied: " + getRoleName()
            + " user trust is below the required threshold of "
            + std::to_string(getMinimumUserTrustScore()) + ".";
        return false;
    }

    if (request.getDeviceTrustScore() < getMinimumDeviceTrustScore())
    {
        reason =
            "Access denied: " + getRoleName()
            + " requires device trust of at least "
            + std::to_string(getMinimumDeviceTrustScore()) + ".";
        return false;
    }

    if (request.getResource().empty() || request.getAction().empty())
    {
        reason = "Access denied: invalid resource or action.";
        return false;
    }

    reason =
        "Access granted: " + getRoleName()
        + " policy passed with user trust "
        + std::to_string(user.getTrustScore())
        + " and device trust "
        + std::to_string(request.getDeviceTrustScore()) + ".";

    return true;
}

std::string AdminPolicy::getRoleName() const
{
    return "Admin";
}

int AdminPolicy::getAssignedUserTrustScore() const
{
    return 90;
}

int AdminPolicy::getMinimumUserTrustScore() const
{
    return 85;
}

int AdminPolicy::getMinimumDeviceTrustScore() const
{
    return 85;
}

std::string SecurityPolicy::getRoleName() const
{
    return "Security";
}

int SecurityPolicy::getAssignedUserTrustScore() const
{
    return 85;
}

int SecurityPolicy::getMinimumUserTrustScore() const
{
    return 80;
}

int SecurityPolicy::getMinimumDeviceTrustScore() const
{
    return 75;
}

std::string DeveloperPolicy::getRoleName() const
{
    return "Developer";
}

int DeveloperPolicy::getAssignedUserTrustScore() const
{
    return 75;
}

int DeveloperPolicy::getMinimumUserTrustScore() const
{
    return 70;
}

int DeveloperPolicy::getMinimumDeviceTrustScore() const
{
    return 65;
}

std::string AnalystPolicy::getRoleName() const
{
    return "Analyst";
}

int AnalystPolicy::getAssignedUserTrustScore() const
{
    return 65;
}

int AnalystPolicy::getMinimumUserTrustScore() const
{
    return 60;
}

int AnalystPolicy::getMinimumDeviceTrustScore() const
{
    return 60;
}
