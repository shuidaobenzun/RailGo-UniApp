#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
RailGo API 测试脚本
用于测试Flask API的各项功能
"""

import requests
import json
import time

# API基础URL
BASE_URL = "http://localhost:5000"

def test_api():
    """测试所有API接口"""
    print("🚄 开始测试 RailGo API...")
    print("=" * 50)
    
    # 测试1: 根路径
    print("1. 测试根路径...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"   状态码: {response.status_code}")
        print(f"   响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
        print("   ✅ 根路径测试通过")
    except Exception as e:
        print(f"   ❌ 根路径测试失败: {e}")
    print()
    
    # 测试2: 健康检查
    print("2. 测试健康检查...")
    try:
        response = requests.get(f"{BASE_URL}/api/health")
        print(f"   状态码: {response.status_code}")
        print(f"   响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
        print("   ✅ 健康检查测试通过")
    except Exception as e:
        print(f"   ❌ 健康检查测试失败: {e}")
    print()
    
    # 测试3: 鉴权接口
    print("3. 测试鉴权接口...")
    try:
        # 成功鉴权
        response = requests.get(f"{BASE_URL}/api/check/1?userid=test_user&key=test_key_123")
        print(f"   成功鉴权状态码: {response.status_code}")
        print(f"   响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
        
        # 失败鉴权
        response = requests.get(f"{BASE_URL}/api/check/1?userid=wrong_user&key=wrong_key")
        print(f"   失败鉴权状态码: {response.status_code}")
        print(f"   响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
        print("   ✅ 鉴权接口测试通过")
    except Exception as e:
        print(f"   ❌ 鉴权接口测试失败: {e}")
    print()
    
    # 测试4: 车次查询
    print("4. 测试车次查询...")
    try:
        response = requests.get(f"{BASE_URL}/api/query?keyword=G1&future=true")
        print(f"   状态码: {response.status_code}")
        print(f"   响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
        print("   ✅ 车次查询测试通过")
    except Exception as e:
        print(f"   ❌ 车次查询测试失败: {e}")
    print()
    
    # 测试5: 站点查询
    print("5. 测试站点查询...")
    try:
        response = requests.get(f"{BASE_URL}/api/stations?keyword=北京")
        print(f"   状态码: {response.status_code}")
        print(f"   响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
        print("   ✅ 站点查询测试通过")
    except Exception as e:
        print(f"   ❌ 站点查询测试失败: {e}")
    print()
    
    # 测试6: 车次列表
    print("6. 测试车次列表...")
    try:
        response = requests.get(f"{BASE_URL}/api/trains?type=G")
        print(f"   状态码: {response.status_code}")
        print(f"   响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
        print("   ✅ 车次列表测试通过")
    except Exception as e:
        print(f"   ❌ 车次列表测试失败: {e}")
    print()
    
    # 测试7: EMU查询
    print("7. 测试EMU查询...")
    try:
        response = requests.get(f"{BASE_URL}/api/emu/query?keyword=G1&future=true")
        print(f"   状态码: {response.status_code}")
        print(f"   响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
        print("   ✅ EMU查询测试通过")
    except Exception as e:
        print(f"   ❌ EMU查询测试失败: {e}")
    print()
    
    # 测试8: 站点详情查询
    print("8. 测试站点详情查询...")
    try:
        response = requests.get(f"{BASE_URL}/api/station/query?station=北京")
        print(f"   状态码: {response.status_code}")
        print(f"   响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
        print("   ✅ 站点详情查询测试通过")
    except Exception as e:
        print(f"   ❌ 站点详情查询测试失败: {e}")
    print()
    
    # 测试9: 数据库更新
    print("9. 测试数据库更新...")
    try:
        response = requests.get(f"{BASE_URL}/api/update/db")
        print(f"   状态码: {response.status_code}")
        print(f"   响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
        print("   ✅ 数据库更新测试通过")
    except Exception as e:
        print(f"   ❌ 数据库更新测试失败: {e}")
    print()
    
    # 测试10: 错误处理
    print("10. 测试错误处理...")
    try:
        # 测试404错误
        response = requests.get(f"{BASE_URL}/api/nonexistent")
        print(f"   404错误状态码: {response.status_code}")
        print(f"   响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
        
        # 测试缺少参数
        response = requests.get(f"{BASE_URL}/api/query")
        print(f"   缺少参数状态码: {response.status_code}")
        print(f"   响应: {json.dumps(response.json(), ensure_ascii=False, indent=2)}")
        print("   ✅ 错误处理测试通过")
    except Exception as e:
        print(f"   ❌ 错误处理测试失败: {e}")
    print()
    
    print("=" * 50)
    print("🎉 所有测试完成！")

def test_performance():
    """性能测试"""
    print("🚀 开始性能测试...")
    print("=" * 30)
    
    # 测试并发请求
    import threading
    
    def make_request():
        try:
            response = requests.get(f"{BASE_URL}/api/health")
            return response.status_code == 200
        except:
            return False
    
    # 创建10个并发请求
    threads = []
    results = []
    
    start_time = time.time()
    
    for i in range(10):
        thread = threading.Thread(target=lambda: results.append(make_request()))
        threads.append(thread)
        thread.start()
    
    # 等待所有线程完成
    for thread in threads:
        thread.join()
    
    end_time = time.time()
    
    success_count = sum(results)
    total_time = end_time - start_time
    
    print(f"并发请求数: 10")
    print(f"成功请求数: {success_count}")
    print(f"总耗时: {total_time:.2f}秒")
    print(f"平均响应时间: {total_time/10:.3f}秒")
    print(f"成功率: {success_count/10*100:.1f}%")
    
    if success_count == 10:
        print("✅ 性能测试通过")
    else:
        print("❌ 性能测试失败")

if __name__ == "__main__":
    # 等待服务器启动
    print("⏳ 等待服务器启动...")
    time.sleep(2)
    
    # 运行功能测试
    test_api()
    print()
    
    # 运行性能测试
    test_performance() 