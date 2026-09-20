#pragma once

#include <string>

class DeviceTrustService
{
public:
    int calculateTrustScore(
        bool antivirusEnabled,
        bool firewallEnabled,
        bool diskEncrypted,
        bool osUpdated,
        bool knownDevice
    ) const;

    bool isTrusted(int trustScore) const;
};