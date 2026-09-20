#pragma once

#include "App.h"
#include "AuthService.h"

class AccessController
{
public:
    static void registerRoutes(
        ZeroTrustApp& app,
        AuthService& authService
    );
};