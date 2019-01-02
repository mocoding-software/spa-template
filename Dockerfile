FROM mocoding/dotnet-node:2.2-10.x

# Copy the app
COPY . /app
WORKDIR /app

EXPOSE 80

# Start the app
ENTRYPOINT dotnet spa-template.dll