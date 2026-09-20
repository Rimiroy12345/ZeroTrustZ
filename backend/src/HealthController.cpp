#include "HealthController.h"

void HealthController::registerRoutes(crow::SimpleApp& app)
{
    CROW_ROUTE(app, "/api/health")([] {
        crow::json::wvalue response;
        response["status"] = "ok";
        response["service"] = "ZeroTrustZ Backend";
        response["message"] = "C++ API is running";

        return response;
    });
}