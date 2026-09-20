#include "DeviceTrustService.h"

int DeviceTrustService::calculateTrustScore(
    bool antivirusEnabled,
    bool firewallEnabled,
    bool diskEncrypted,
    bool osUpdated,
    bool knownDevice
) const
{
    int score = 0;

    if (antivirusEnabled)
        score += 20;

    if (firewallEnabled)
        score += 20;

    if (diskEncrypted)
        score += 20;

    if (osUpdated)
        score += 20;

    if (knownDevice)
        score += 20;

    return score;
}

bool DeviceTrustService::isTrusted(int trustScore) const
{
    return trustScore >= 60;
}