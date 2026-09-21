#include "AuthController.h"

#include <cstdlib>
#include <string>

void AuthController::registerRoutes(
    ZeroTrustApp& app,
    AuthService& authService
)
{
    CROW_ROUTE(app, "/api/auth/login")
        .methods(crow::HTTPMethod::POST)
    ([&authService](const crow::request& req)
    {
        auto body = crow::json::load(req.body);

        if (!body)
        {
            return crow::response(
                400,
                R"({"error":"Invalid JSON request body"})"
            );
        }

        if (!body.has("userId") || !body.has("password"))
        {
            return crow::response(
                400,
                R"({"error":"userId and password are required"})"
            );
        }

        const char* configuredUser =
            std::getenv("ZEROTRUST_ADMIN_USER");

        const char* configuredPassword =
            std::getenv("ZEROTRUST_ADMIN_PASSWORD");

        if (!configuredUser || !configuredPassword)
        {
            return crow::response(
                503,
                R"({"error":"Server authentication is not configured"})"
            );
        }

        const std::string userId = body["userId"].s();
        const std::string password = body["password"].s();

        if (userId != configuredUser ||
            password != configuredPassword)
        {
            return crow::response(
                401,
                R"({"error":"Invalid credentials"})"
            );
        }

        const std::string token =
            authService.createSession(userId);

        crow::json::wvalue response;
        response["authenticated"] = true;
        response["userId"] = userId;
        response["token"] = token;
        response["expiresInMinutes"] = 30;

        return crow::response(200, response);
    });

    CROW_ROUTE(app, "/api/auth/validate")
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
                R"({"valid":false,"error":"Missing bearer token"})"
            );
        }

        const std::string token =
            authHeader.substr(prefix.length());

        std::string userId;
        const bool valid =
            authService.validateSession(token, userId);

        crow::json::wvalue response;
        response["valid"] = valid;

        if (valid)
        {
            response["userId"] = userId;
            return crow::response(200, response);
        }

        response["error"] = "Invalid or expired session token";
        return crow::response(401, response);
    });

    CROW_ROUTE(app, "/api/auth/logout")
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

        const bool revoked =
            authService.revokeSession(token);

        crow::json::wvalue response;
        response["loggedOut"] = revoked;

        if (revoked)
        {
            response["message"] = "Session successfully revoked.";
            return crow::response(200, response);
        }

        response["error"] =
            "Invalid or already expired session token.";

        return crow::response(401, response);
    });
}
