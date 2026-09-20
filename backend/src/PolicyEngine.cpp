#include "PolicyEngine.h"

PolicyEngine::PolicyEngine(
    int minimumUserTrustScore,
    int minimumDeviceTrustScore
)
    : minimumUserTrustScore(minimumUserTrustScore),
      minimumDeviceTrustScore(minimumDeviceTrustScore)
{
}

bool PolicyEngine::evaluate(
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

    if (user.getTrustScore() < minimumUserTrustScore)
    {
        reason = "Access denied: user trust score is below the required threshold.";
        return false;
    }

    if (request.getDeviceTrustScore() < minimumDeviceTrustScore)
    {
        reason = "Access denied: device trust score is below the required threshold.";
        return false;
    }

    if (request.getResource().empty() || request.getAction().empty())
    {
        reason = "Access denied: invalid resource or action.";
        return false;
    }

    reason = "Access granted: Zero Trust policy checks passed.";
    return true;
}