#include <cstdlib>

#include "App.h"
#include "HealthController.h"
#include "AccessController.h"
#include "AuthController.h"
#include "AuthService.h"
#include "DeviceController.h"
#include "AuditController.h"

int main()
{
    ZeroTrustApp app;

    AuthService authService;

    auto& cors = app.get_middleware<crow::CORSHandler>();

    cors.global()
        .origin("https://zerotrustz-frontend.onrender.com")
        .headers(
            "Origin",
            "Content-Type",
            "Accept",
            "Authorization"
        )
        .methods(
            crow::HTTPMethod::GET,
            crow::HTTPMethod::POST,
            crow::HTTPMethod::OPTIONS
        )
        .max_age(3600);

    HealthController::registerRoutes(app);
    AccessController::registerRoutes(app, authService);
    AuthController::registerRoutes(app, authService);
    DeviceController::registerRoutes(app);
    AuditController::registerRoutes(app, authService);

    const char* portEnv = std::getenv("PORT");
    const int port = portEnv ? std::stoi(portEnv) : 8080;

    app.bindaddr("0.0.0.0")
       .port(port)
       .multithreaded()
       .run();

    return 0;
}