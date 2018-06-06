FROM mocoding/dotnet-node:2.1-8.x

# Copy the app
COPY . /app
WORKDIR /app

EXPOSE 80

# Start the app
ENTRYPOINT dotnet spa-template.dll