#pragma once

#include <string>

#include "AccessRequest.h"
#include "User.h"

struct PolicyEvaluation
{
    bool allowed;
    std::string reason;
    int assignedUserTrustScore;
    int requiredUserTrustScore;
    int requiredDeviceTrustScore;
    std::string roleName;
};

class PolicyEngine
{
public:
    PolicyEvaluation evaluate(
        User& user,
        const AccessRequest& request
    ) const;
};
