#include "AuthController.h"

void AuthController::registerRoutes(
    ZeroTrustApp& app,
    AuthService& authService
)
{
    // -----------------------------
    // Login
    // -----------------------------
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

        if (!body.has("userId"))
        {
            return crow::response(
                400,
                R"({"error":"userId is required"})"
            );
        }

        const std::string userId = body["userId"].s();

        const std::string token =
            authService.createSession(userId);

        crow::json::wvalue response;

        response["authenticated"] = true;
        response["userId"] = userId;
        response["token"] = token;
        response["expiresInMinutes"] = 30;

        return crow::response(200, response);
    });

    // -----------------------------
    // Validate Session
    // -----------------------------
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

    // -----------------------------
    // Logout
    // -----------------------------
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
