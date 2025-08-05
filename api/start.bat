@echo off
echo 🚄 启动 RailGo API Server...
echo.

REM 检查Python是否安装
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未找到Python，请先安装Python
    pause
    exit /b 1
)

REM 检查依赖是否安装
echo 📦 检查依赖...
pip show flask >nul 2>&1
if errorlevel 1 (
    echo 📥 安装依赖...
    pip install -r requirements.txt
)

echo.
echo 🚀 启动服务器...
echo 📡 服务地址: http://localhost:5000
echo 📚 API文档: http://localhost:5000
echo 🔧 健康检查: http://localhost:5000/api/health
echo.
echo 按 Ctrl+C 停止服务器
echo.

python app.py

pause 