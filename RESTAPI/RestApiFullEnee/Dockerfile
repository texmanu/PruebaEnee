#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["RestApiFullEnee/RestApiFullEnee.csproj", "RestApiFullEnee/"]
RUN dotnet restore "RestApiFullEnee/RestApiFullEnee.csproj"
COPY . .
WORKDIR "/src/RestApiFullEnee"
RUN dotnet build "RestApiFullEnee.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RestApiFullEnee.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RestApiFullEnee.dll"]