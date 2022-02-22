- Cài .net core lastest
- Cài visual 2019
- cài webpack
---------------------------------
npm install
dotnet restore
dotnet run


#fix error on run published:

An assembly specified in the application dependencies manifest 
==>
Adding the following to my .csproj:
<PropertyGroup>
  <PublishWithAspNetCoreTargetManifest>false</PublishWithAspNetCoreTargetManifest>
</PropertyGroup>