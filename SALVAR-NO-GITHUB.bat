@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo ===============================================
echo   SALVANDO NO GITHUB - Desenvolvimento Web
echo ===============================================
echo.

git add -A

git diff --cached --quiet
if %errorlevel%==0 (
    echo Nada mudou desde o ultimo salvamento.
    echo.
    pause
    exit /b 0
)

echo O que mudou:
git diff --cached --name-status
echo.

set "MSG=%date% %time:~0,5% - atualizacao"
git commit -m "%MSG%"
if errorlevel 1 goto erro

git push
if errorlevel 1 goto erro

echo.
echo ===============================================
echo   PRONTO! Tudo salvo no GitHub.
echo ===============================================
echo.
pause
exit /b 0

:erro
echo.
echo !!! DEU ERRO. Leia a mensagem acima. !!!
echo.
pause
exit /b 1
