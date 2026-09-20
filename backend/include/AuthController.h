#pragma once

#include "App.h"
#include "AuthService.h"

class AuthController
{
public:
    static void registerRoutes(
        ZeroTrustApp& app,
        AuthService& authService
    );
};