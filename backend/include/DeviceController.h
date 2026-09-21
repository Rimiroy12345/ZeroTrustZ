#pragma once

#include "App.h"
#include "AuthService.h"

class DeviceController
{
public:
    static void registerRoutes(
        ZeroTrustApp& app,
        AuthService& authService
    );
};
