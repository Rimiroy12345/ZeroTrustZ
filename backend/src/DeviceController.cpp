#include "DeviceController.h"
#include "DeviceTrustService.h"


void DeviceController::registerRoutes(ZeroTrustApp& app)
{
    CROW_ROUTE(app, "/api/device/evaluate")
        .methods(crow::HTTPMethod::POST)
    ([](const crow::request& req)
    {
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