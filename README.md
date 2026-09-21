# ZeroTrustZ
Cloud Security with Zero Trust Architecture — Object-Oriented Web Application

ZeroTrustZ is a full-stack Zero Trust security prototype built to demonstrate how every access request can be independently authenticated, validated, and authorized instead of trusting users simply because they are already inside a system.

The project combines a modern React + Vite security dashboard with a C++17 backend built using Crow, where the actual Zero Trust authorization logic is implemented using Object-Oriented Programming concepts.

# Project Objective
The core objective of ZeroTrustZ is to implement the principle:

Never trust automatically. Always verify.

A successful login does not automatically grant access to every resource.

Instead, each access request can be evaluated using contextual information such as:

-> Authentication state
-> Session validity
-> User trust score
-> Device trust score
-> Requested resource
-> Requested action
-> Device identity
-> Network/request context

The backend then makes an independent decision:

ALLOW or DENY



Frontend

https://zerotrustz-frontend.onrender.com/

C++ Backend API

https://zerotrustz.onrender.com/

Health Check
https://zerotrustz.onrender.com/api/health


C++ and Object-Oriented Programming

The backend was intentionally designed using multiple classes instead of placing all logic inside main.cpp.

This allows the project to demonstrate real OOP design in a deployed web application.

Main Classes
User

Represents an identity inside the Zero Trust system.

Stores:

User ID
Username
Role
Authentication state
Trust score

This class demonstrates encapsulation, because the user state is kept private and accessed through public methods.

AccessRequest

Represents an attempt to access a protected resource.

Stores:

User ID
Resource
Action
IP address
Device ID
Device trust score

Instead of passing unrelated variables throughout the application, the entire request context is represented as an object.

AuthService

Handles backend session management.

Responsibilities include:

Creating session tokens
Associating sessions with users
Setting session expiry
Validating tokens
Revoking sessions during logout

Sessions currently expire after 30 minutes.

DeviceTrustService

Evaluates the security posture of a device.

The service currently checks:

Antivirus enabled
Firewall enabled
Disk encryption
Updated operating system
Known device

Each valid security condition contributes 20 points.

Antivirus enabled   +20
Firewall enabled    +20
Disk encrypted      +20
OS updated          +20
Known device        +20
------------------------
Maximum score        100

A device trust score of 60 or above is considered trusted.


PolicyEngine

The PolicyEngine is the central Zero Trust authorization component.

It evaluates the User and AccessRequest objects and determines whether access should be granted.

Current policy flow:

Is the user authenticated?
        |
       Yes
        v
Does the identity match the request?
        |
       Yes
        v
Is user trust >= 60?
        |
       Yes
        v
Is device trust >= 60?
        |
       Yes
        v
Are resource and action valid?
        |
       Yes
        v
      ALLOW

Any failed check results in:

DENY

Example:

User Trust:   85
Device Trust: 90

Decision: ALLOW

Changing only the device context:

User Trust:   85
Device Trust: 20

Decision: DENY

What does this demonstrate? 
-> Being authenticated does not automatically mean authorized

AuditLogger

Every evaluated access request is logged with information such as:

->User
->Resource
->Action
->ALLOW / DENY result
->Reason for the decision
->Timestamp

This provides traceability for security decisions.

Key Takeaway

ZeroTrustZ demonstrates that Object-Oriented C++ can be used as the core of a modern full-stack security application.

Rather than building C++ as an isolated console program, the project uses C++ classes to provide authentication services, device trust evaluation, authorization policies, audit logging, and REST APIs to a deployed web interface.

The frontend presents the security system.
The C++ backend makes the security decisions.
