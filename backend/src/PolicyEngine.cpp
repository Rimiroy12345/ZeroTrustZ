#include "PolicyEngine.h"

#include "RolePolicyFactory.h"

PolicyEvaluation PolicyEngine::evaluate(
    User& user,
    const AccessRequest& request
) const
{
    PolicyEvaluation result{
        false,
        "",
        0,
        0,
        0,
        ""
    };

    auto policy =
        RolePolicyFactory::create(user.getRole());

    if (!policy)
    {
        result.reason =
            "Access denied: unsupported user role.";
        return result;
    }

    user.setTrustScore(
        policy->getAssignedUserTrustScore()
    );

    result.assignedUserTrustScore =
        policy->getAssignedUserTrustScore();

    result.requiredUserTrustScore =
        policy->getMinimumUserTrustScore();

    result.requiredDeviceTrustScore =
        policy->getMinimumDeviceTrustScore();

    result.roleName =
        policy->getRoleName();

    result.allowed =
        policy->evaluate(
            user,
            request,
            result.reason
        );

    return result;
}
