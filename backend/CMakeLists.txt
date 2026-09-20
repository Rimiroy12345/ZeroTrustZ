cmake_minimum_required(VERSION 3.16)

project(ZeroTrustZBackend LANGUAGES CXX)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include(FetchContent)

# -----------------------------
# Standalone Asio
# -----------------------------
FetchContent_Declare(
    asio
    GIT_REPOSITORY https://github.com/chriskohlhoff/asio.git
    GIT_TAG asio-1-32-0
)

FetchContent_GetProperties(asio)

if(NOT asio_POPULATED)
    FetchContent_Populate(asio)
endif()

set(
    ASIO_INCLUDE_DIR
    ${asio_SOURCE_DIR}/asio/include
    CACHE PATH "Asio include directory"
)

# -----------------------------
# Crow
# -----------------------------
FetchContent_Declare(
    Crow
    GIT_REPOSITORY https://github.com/CrowCpp/Crow.git
    GIT_TAG v1.3.1
)

set(CROW_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)
set(CROW_BUILD_TESTS OFF CACHE BOOL "" FORCE)

FetchContent_MakeAvailable(Crow)

# -----------------------------
# ZeroTrustZ Backend
# -----------------------------
add_executable(
    zerotrustz

    src/main.cpp
    src/HealthController.cpp
    src/AccessController.cpp
    src/User.cpp
    src/AccessRequest.cpp
    src/PolicyEngine.cpp
    src/AuditLogger.cpp
    src/AuthService.cpp
    src/AuthController.cpp
    src/DeviceTrustService.cpp
    src/DeviceController.cpp
    src/AuditController.cpp
)

target_include_directories(
    zerotrustz
    PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/include
    ${ASIO_INCLUDE_DIR}
)

target_compile_definitions(
    zerotrustz
    PRIVATE
    ASIO_STANDALONE
    WIN32_LEAN_AND_MEAN
)

target_link_libraries(
    zerotrustz
    PRIVATE
    Crow::Crow
)

if(WIN32)
    target_link_libraries(
        zerotrustz
        PRIVATE
        ws2_32
        mswsock
    )
endif()