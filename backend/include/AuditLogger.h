#pragma once

#include <string>

class AuditLogger
{
public:
    static void logAccessDecision(
        const std::string& userId,
        const std::string& resource,
        const std::string& action,
        bool allowed,
        const std::string& reason
    );
};