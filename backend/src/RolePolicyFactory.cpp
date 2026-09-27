#include "RolePolicyFactory.h"

#include <algorithm>
#include <cctype>

std::unique_ptr<RolePolicy> RolePolicyFactory::create(
    const std::string& role
)
{
    std::string normalized = role;

    std::transform(
        normalized.begin(),
        normalized.end(),
        normalized.begin(),
        [](unsigned char character)
        {
            return static_cast<char>(
                std::tolower(character)
            );
        }
    );

    if (normalized == "admin")
        return std::make_unique<AdminPolicy>();

    if (normalized == "security")
        return std::make_unique<SecurityPolicy>();

    if (normalized == "developer")
        return std::make_unique<DeveloperPolicy>();

    if (normalized == "analyst")
        return std::make_unique<AnalystPolicy>();

    return nullptr;
}
