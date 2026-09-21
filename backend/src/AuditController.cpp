#include "AuditController.h"

#include <fstream>
#include <string>
#include <vector>

void AuditController::registerRoutes(
    ZeroTrustApp& app,
    AuthService& authService
)
{
    CROW_ROUTE(app, "/api/audit/logs")
        .methods(crow::HTTPMethod::GET)
    ([&authService](const crow::request& req)
    {
        const std::string authHeader =
            req.get_header_value("Authorization");

        const std::string prefix = "Bearer ";

        if (authHeader.rfind(prefix, 0) != 0)
        {
            return crow::response(
                401,
                R"({"error":"Missing bearer token"})"
            );
        }

        const std::string token =
            authHeader.substr(prefix.length());

        std::string authenticatedUserId;

        if (!authService.validateSession(
                token,
                authenticatedUserId))
        {
            return crow::response(
                401,
                R"({"error":"Invalid or expired session token"})"
            );
        }

        std::ifstream logFile("backend/config/audit.log");

        crow::json::wvalue response;
        std::vector<crow::json::wvalue> logs;

        if (!logFile.is_open())
        {
            response["count"] = 0;
            response["logs"] = std::move(logs);
            return crow::response(200, response);
        }

        std::string line;

        while (std::getline(logFile, line))
        {
            if (!line.empty())
            {
                crow::json::wvalue entry;
                entry["entry"] = line;
                logs.push_back(std::move(entry));
            }
        }

        response["count"] =
            static_cast<int>(logs.size());

        response["logs"] = std::move(logs);

        return crow::response(200, response);
    });
}
