// @/scripts/sqlite.js

export async function loadDB() {
	await plus.sqlite.openDatabase({
		name: 'railgo',
		path: '_doc/railgo.sqlite',
		fail: () => {
			console.log("Error when loading SQLite database");
		}
	});
}

export async function doQuery(sql, callback) {
	if (!await plus.sqlite.isOpenDatabase({
			name: 'railgo',
			path: '_doc/railgo.sqlite'
		})) {
		throw new Error("SQLite DB hasn't opened yet");
	}
	await plus.sqlite.selectSql({
		name: 'railgo',
		sql: sql,
		success: data => {
			callback(data);
		},
		fail: () => {
			throw new Error("Failed to execute the SQL");
		}
	});
}

export async function close() {  
	await plus.sqlite.closeDatabase({
		name: "railgo"
	});
}