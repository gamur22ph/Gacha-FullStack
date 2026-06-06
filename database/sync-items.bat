@echo off
setlocal enabledelayedexpansion

if exist .env (
    for /f "usebackq delims=" %%x in (".env") do set "%%x"
) else (
    echo [ERROR] .env file not found! Please create one.
    pause
    exit /b
)


echo Starting database sync...
mongoimport --uri "%HOST_URI%" --db "%DB_NAME%" --collection items --file items-3.json --mode upsert --upsertFields itemId --jsonArray
mongoimport --uri "%HOST_URI%" --db "%DB_NAME%" --collection items --file items-4.json --mode upsert --upsertFields itemId --jsonArray
mongoimport --uri "%HOST_URI%" --db "%DB_NAME%" --collection items --file items-5.json --mode upsert --upsertFields itemId --jsonArray
echo All items updated!
pause