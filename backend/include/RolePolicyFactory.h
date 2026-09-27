#pragma once

#include <memory>
#include <string>

#include "RolePolicy.h"

class RolePolicyFactory
{
public:
    static std::unique_ptr<RolePolicy> create(
        const std::string& role
    );
};
