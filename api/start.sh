#!/bin/bash

echo "🚄 启动 RailGo API Server..."
echo

# 检查Python是否安装
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误: 未找到Python3，请先安装Python3"
    exit 1
fi

# 检查依赖是否安装
echo "📦 检查依赖..."
if ! python3 -c "import flask" &> /dev/null; then
    echo "📥 安装依赖..."
    pip3 install -r requirements.txt
fi

echo
echo "🚀 启动服务器..."
echo "📡 服务地址: http://localhost:5000"
echo "📚 API文档: http://localhost:5000"
echo "🔧 健康检查: http://localhost:5000/api/health"
echo
echo "按 Ctrl+C 停止服务器"
echo

python3 app.py 