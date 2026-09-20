#pragma once

#include <string>

class AccessRequest
{
private:
    std::string userId;
    std::string resource;
    std::string action;
    std::string ipAddress;
    std::string deviceId;
    int deviceTrustScore;

public:
    AccessRequest(
        const std::string& userId,
        const std::string& resource,
        const std::string& action,
        const std::string& ipAddress,
        const std::string& deviceId,
        int deviceTrustScore
    );

    const std::string& getUserId() const;
    const std::string& getResource() const;
    const std::string& getAction() const;
    const std::string& getIpAddress() const;
    const std::string& getDeviceId() const;
    int getDeviceTrustScore() const;
};