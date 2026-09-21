#pragma once

#include "App.h"
#include "AuthService.h"

class AuditController
{
public:
    static void registerRoutes(
        ZeroTrustApp& app,
        AuthService& authService
    );
};
