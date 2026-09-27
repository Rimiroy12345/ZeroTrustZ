#pragma once

#include <string>

#include "AccessRequest.h"
#include "User.h"

class RolePolicy
{
public:
    virtual ~RolePolicy() = default;

    virtual std::string getRoleName() const = 0;
    virtual int getAssignedUserTrustScore() const = 0;
    virtual int getMinimumUserTrustScore() const = 0;
    virtual int getMinimumDeviceTrustScore() const = 0;

    bool evaluate(
        const User& user,
        const AccessRequest& request,
        std::string& reason
    ) const;
};

class AdminPolicy : public RolePolicy
{
public:
    std::string getRoleName() const override;
    int getAssignedUserTrustScore() const override;
    int getMinimumUserTrustScore() const override;
    int getMinimumDeviceTrustScore() const override;
};

class SecurityPolicy : public RolePolicy
{
public:
    std::string getRoleName() const override;
    int getAssignedUserTrustScore() const override;
    int getMinimumUserTrustScore() const override;
    int getMinimumDeviceTrustScore() const override;
};

class DeveloperPolicy : public RolePolicy
{
public:
    std::string getRoleName() const override;
    int getAssignedUserTrustScore() const override;
    int getMinimumUserTrustScore() const override;
    int getMinimumDeviceTrustScore() const override;
};

class AnalystPolicy : public RolePolicy
{
public:
    std::string getRoleName() const override;
    int getAssignedUserTrustScore() const override;
    int getMinimumUserTrustScore() const override;
    int getMinimumDeviceTrustScore() const override;
};
