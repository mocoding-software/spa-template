FROM mocoding/dotnet-node:3.1-12.x-dev as devbox

ADD . /workspace
WORKDIR /workspace

RUN yarn
RUN dotnet publish -c Release --no-self-contained -o /_pub /p:DebugType=None

FROM mocoding/dotnet-node:3.1-12.x-prod

# Copy the app
COPY --from=devbox /_pub /app
WORKDIR /app

# Start the app
ENTRYPOINT dotnet spa-template.dll
