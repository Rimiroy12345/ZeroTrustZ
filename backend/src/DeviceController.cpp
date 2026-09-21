#include "DeviceController.h"
#include "DeviceTrustService.h"

void DeviceController::registerRoutes(
    ZeroTrustApp& app,
    AuthService& authService
)
{
    CROW_ROUTE(app, "/api/device/evaluate")
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
                R"({"error":"Invalid or expired session token"})"
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

        if (!body.has("antivirusEnabled") ||
            !body.has("firewallEnabled") ||
            !body.has("diskEncrypted") ||
            !body.has("osUpdated") ||
            !body.has("knownDevice"))
        {
            return crow::response(
                400,
                R"({"error":"Missing device posture fields"})"
            );
        }

        DeviceTrustService service;

        const int score =
            service.calculateTrustScore(
                body["antivirusEnabled"].b(),
                body["firewallEnabled"].b(),
                body["diskEncrypted"].b(),
                body["osUpdated"].b(),
                body["knownDevice"].b()
            );

        const bool trusted =
            service.isTrusted(score);

        crow::json::wvalue response;
        response["trustScore"] = score;
        response["trusted"] = trusted;
        response["decision"] =
            trusted ? "TRUSTED" : "UNTRUSTED";

        return crow::response(
            trusted ? 200 : 403,
            response
        );
    });
}
