#pragma once

#include <crow.h>

class HealthController
{
public:
    static void registerRoutes(crow::SimpleApp& app);
};