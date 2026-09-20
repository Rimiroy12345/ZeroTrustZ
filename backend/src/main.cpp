#include <crow.h>
#include <cstdlib>
#include "HealthController.h"

int main()
{
    crow::SimpleApp app;

    HealthController::registerRoutes(app);

    const char* portEnv = std::getenv("PORT");
    const int port = portEnv ? std::stoi(portEnv) : 8080;

    app.bindaddr("0.0.0.0")
       .port(port)
       .multithreaded()
       .run();

    return 0;
}