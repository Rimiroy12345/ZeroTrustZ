FROM gcc:14-bookworm AS build

RUN apt-get update && \
    apt-get install -y cmake git && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend ./backend

RUN cmake -S backend -B backend/build \
    -DCMAKE_BUILD_TYPE=Release && \
    cmake --build backend/build -j2


FROM debian:bookworm-slim

RUN apt-get update && \
    apt-get install -y libstdc++6 ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app/backend/build/zerotrustz ./zerotrustz

RUN mkdir -p /app/backend/config

ENV PORT=10000

EXPOSE 10000

CMD ["./zerotrustz"]
