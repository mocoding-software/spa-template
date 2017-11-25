FROM microsoft/aspnetcore:2.0.3-stretch

# Install NodeJS 
RUN apt-get update
RUN apt-get -y install gnupg2
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs


# Copy the app
COPY . /app
WORKDIR /app

EXPOSE 80

# Start the app
ENTRYPOINT dotnet spa-template.dll