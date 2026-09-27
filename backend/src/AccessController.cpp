#include "AccessController.h"
#include "User.h"
#include "AccessRequest.h"
#include "PolicyEngine.h"
#include "AuditLogger.h"

void AccessController::registerRoutes(
    ZeroTrustApp& app,
    AuthService& authService
)
{
    CROW_ROUTE(app, "/api/access/evaluate")
        .methods(crow::HTTPMethod::POST)
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
                R"({"error":"Invalid session token"})"
            );
        }

        auto body = crow::json::load(req.body);

        if (!body)
        {
            return crow::response(
                400,
                R"({"error":"Invalid JSON request body"})"
            );
        }

        if (!body.has("username") ||
            !body.has("role") ||
            !body.has("resource") ||
            !body.has("action") ||
            !body.has("ipAddress") ||
            !body.has("deviceId") ||
            !body.has("deviceTrustScore"))
        {
            return crow::response(
                400,
                R"({"error":"Missing required fields"})"
            );
        }

        User user(
            authenticatedUserId,
            body["username"].s(),
            body["role"].s()
        );

        user.setAuthenticated(true);

        AccessRequest accessRequest(
            authenticatedUserId,
            body["resource"].s(),
            body["action"].s(),
            body["ipAddress"].s(),
            body["deviceId"].s(),
            body["deviceTrustScore"].i()
        );

        PolicyEngine policyEngine;

        const PolicyEvaluation evaluation =
            policyEngine.evaluate(
                user,
                accessRequest
            );

        AuditLogger::logAccessDecision(
            user.getId(),
            accessRequest.getResource(),
            accessRequest.getAction(),
            evaluation.allowed,
            evaluation.reason
        );

        crow::json::wvalue response;

        response["allowed"] = evaluation.allowed;
        response["decision"] =
            evaluation.allowed ? "ALLOW" : "DENY";
        response["reason"] = evaluation.reason;
        response["userId"] = authenticatedUserId;
        response["resource"] =
            accessRequest.getResource();
        response["action"] =
            accessRequest.getAction();

        response["policy"]["role"] =
            evaluation.roleName;
        response["policy"]["assignedUserTrustScore"] =
            evaluation.assignedUserTrustScore;
        response["policy"]["requiredUserTrustScore"] =
            evaluation.requiredUserTrustScore;
        response["policy"]["requiredDeviceTrustScore"] =
            evaluation.requiredDeviceTrustScore;

        return crow::response(
            evaluation.allowed ? 200 : 403,
            response
        );
    });
}
