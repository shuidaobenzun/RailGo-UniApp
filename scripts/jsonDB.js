// @/scripts/jsonDB.js

let db = {};
let isLoaded = false;
let isLoading = false;

// 加载数据库的私有方法
export async function loadDB() {
    return new Promise((resolve, reject) => {
        if (isLoading) {
            const checkInterval = setInterval(() => {
                if (!isLoading) {
                    clearInterval(checkInterval);
                    isLoaded ? resolve() : reject(new Error('数据库加载失败'));
                }
            }, 100);
            return;
        }
        
        isLoading = true;
        isLoaded = false;
        
        // #ifdef APP
        plus.io.requestFileSystem(plus.io.PRIVATE_DOC, (fs) => {
            fs.root.getFile('railgo.json', { create: false }, (fileEntry) => {
                fileEntry.file((file) => {
                    const reader = new plus.io.FileReader();
                    reader.onloadend = (evt) => {
                        try {
                            const data = JSON.parse(evt.target.result);
                            if (!data || typeof data !== 'object') {
                                throw new Error('无效的数据库格式');
                            }
                            
                            db = data;
                            isLoaded = true;
                            isLoading = false;
                            
                            // 记录数据库大小
                            uni.setStorageSync("dbSize", file.size);
                            
                            // 记录表数量
                            const tableCount = db._index_trains ? Object.keys(db._index_trains).length : 0;
                            uni.setStorageSync("dbTable", tableCount);
                            
                            resolve();
                        } catch (e) {
                            isLoading = false;
                            console.error('数据库解析错误:', e);
                            reject(new Error('解析数据库失败: ' + e.message));
                        }
                    };
                    reader.onerror = () => {
                        isLoading = false;
                        reject(new Error('读取文件失败'));
                    };
                    reader.readAsText(file);
                }, (e) => {
                    isLoading = false;
                    reject(new Error('读取文件失败: ' + JSON.stringify(e)));
                });
            }, (e) => {
                isLoading = false;
                reject(new Error('文件不存在: ' + JSON.stringify(e)));
            });
        }, (e) => {
            isLoading = false;
            reject(new Error('请求文件系统失败: ' + JSON.stringify(e)));
        });
        // #endif

        // #ifdef H5
        uni.request({
            url: `/data/railgo-db.json`,
            success: (res) => {
                try {
                    if (!res.data || typeof res.data !== 'object') {
                        throw new Error('无效的数据库格式');
                    }
                    
                    db = res.data;
                    isLoaded = true;
                    isLoading = false;
                    
                    // H5端无法获取文件大小，设置默认值
                    uni.setStorageSync("dbSize", 0);
                    uni.setStorageSync("dbTable", db._index_trains ? Object.keys(db._index_trains).length : 0);
                    
                    resolve();
                } catch (e) {
                    isLoading = false;
                    reject(new Error('解析JSON失败: ' + e.message));
                }
            },
            fail: (err) => {
                isLoading = false;
                reject(new Error('获取JSON失败: ' + JSON.stringify(err)));
            }
        });
        // #endif
    });
}

// 公开的查询方法
export async function query(tableName, conditionCallback) {
	if (!isLoaded) {
		try {
			await loadDB();
		} catch (e) {
			console.error('数据库加载失败:', e.message);
			return [];
		}
	}

	if (!db || typeof db !== 'object') {
		console.error('数据库未正确加载');
		return [];
	}

	if (!db[tableName] || !Array.isArray(db[tableName])) {
		console.error(`表 ${tableName} 不存在或不是数组`);
		return [];
	}

	if (typeof conditionCallback !== 'function') {
		return db[tableName]; // 如果没有查询条件，返回所有数据
	}

	return db[tableName].filter(item => conditionCallback(item));
}

// 主键查询，优化性能
export async function queryMainKey(tableName, key) {
	if (!isLoaded) {
		try {
			await loadDB();
		} catch (e) {
			console.error('数据库加载失败:', e.message);
			return [];
		}
	}

	if (!db || !db["_index_" + tableName] || typeof db["_index_" + tableName][key] === 'undefined') {
		return [];
	}

	const index = db["_index_" + tableName][key];
	const result = db[tableName].at(index);
	return result ? [result] : [];
}