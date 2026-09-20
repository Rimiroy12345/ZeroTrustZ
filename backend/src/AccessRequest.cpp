#include "AccessRequest.h"

AccessRequest::AccessRequest(
    const std::string& userId,
    const std::string& resource,
    const std::string& action,
    const std::string& ipAddress,
    const std::string& deviceId,
    int deviceTrustScore
)
    : userId(userId),
      resource(resource),
      action(action),
      ipAddress(ipAddress),
      deviceId(deviceId),
      deviceTrustScore(deviceTrustScore)
{
}

const std::string& AccessRequest::getUserId() const
{
    return userId;
}

const std::string& AccessRequest::getResource() const
{
    return resource;
}

const std::string& AccessRequest::getAction() const
{
    return action;
}

const std::string& AccessRequest::getIpAddress() const
{
    return ipAddress;
}

const std::string& AccessRequest::getDeviceId() const
{
    return deviceId;
}

int AccessRequest::getDeviceTrustScore() const
{
    return deviceTrustScore;
}