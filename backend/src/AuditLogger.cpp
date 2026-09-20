#include "AuditLogger.h"

#include <chrono>
#include <ctime>
#include <fstream>
#include <iomanip>

void AuditLogger::logAccessDecision(
    const std::string& userId,
    const std::string& resource,
    const std::string& action,
    bool allowed,
    const std::string& reason
)
{
    std::ofstream logFile(
        "backend/config/audit.log",
        std::ios::app
    );

    if (!logFile.is_open())
        return;

    const auto now = std::chrono::system_clock::now();
    const std::time_t currentTime =
        std::chrono::system_clock::to_time_t(now);

    logFile
        << std::put_time(
               std::localtime(&currentTime),
               "%Y-%m-%d %H:%M:%S"
           )
        << " | user=" << userId
        << " | resource=" << resource
        << " | action=" << action
        << " | decision=" << (allowed ? "ALLOW" : "DENY")
        << " | reason=" << reason
        << '\n';
}