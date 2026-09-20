#pragma once

#include <string>
#include "User.h"
#include "AccessRequest.h"

class PolicyEngine
{
private:
    int minimumUserTrustScore;
    int minimumDeviceTrustScore;

public:
    PolicyEngine(
        int minimumUserTrustScore = 60,
        int minimumDeviceTrustScore = 60
    );

    bool evaluate(
        const User& user,
        const AccessRequest& request,
        std::string& reason
    ) const;
};