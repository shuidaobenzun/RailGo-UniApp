// @/scripts/jsonDB.js

let db = {};
let isLoaded = false;
let isLoading = false;

// 加载数据库的私有方法
export async function loadDB() {
	return new Promise((resolve, reject) => {
		if(isLoading){
			while(isLoading){
				;
			}
			return;
		}
		isLoading = true;
		// #ifdef APP-PLUS
		// APP端使用plus.io读取本地文件
		plus.io.requestFileSystem(plus.io.PRIVATE_DOC, (fs) => {
			fs.root.getFile(`railgo.json`, {
				create: false
			}, (fileEntry) => {
				fileEntry.file((file) => {
					const reader = new plus.io.FileReader();
					reader.onloadend = (evt) => {
						try {
							db = JSON.parse(evt.target.result);
							isLoaded = true;
							isLoading = false;
							resolve();
						} catch (e) {
							reject(new Error('解析JSON失败'));
						}
					};
					reader.readAsText(file);
				}, (e) => {
					isLoading = false;
					reject(new Error('读取文件失败'));
				});
			}, (e) => {
				isLoading = false;
				reject(new Error('文件不存在'));
			});
		});
		// #endif

		// #ifdef H5
		// H5端使用uni.request请求网络文件
		uni.request({
			url: `/data/railgo-db.json`,
			success: (res) => {
				try {
					db = res.data;
					isLoaded = true;
					isLoading = false;
					resolve();
				} catch (e) {
					isLoading = false;
					reject(new Error('解析JSON失败'));
				}
			},
			fail: () => {
				isLoading = false;
				reject(new Error('获得JSON失败'));
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
		isLoaded = true;
	}

	if (!db || typeof db !== 'object') {
		console.error('数据库未正确加载');
		return [];
	}

	if (!db[tableName] || !Array.isArray(db[tableName])) {
		console.log(db);
		console.error(`表 ${tableName} 不存在或不是数组`);
		return [];
	}

	if (typeof conditionCallback !== 'function') {
		return db[tableName]; // 如果没有查询条件，返回所有数据
	}

	return db[tableName].filter(item => conditionCallback(item));
}

// 主键查询，优化性能
export async function queryMainKey(tableName, key){
	if (!isLoaded) {
		try {
			await loadDB();
		} catch (e) {
			console.error('数据库加载失败:', e.message);
			return [];
		}
		isLoaded = true;
	}
	return [db[tableName].at(db["_index_"+tableName][key])];
}