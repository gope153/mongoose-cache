import fs from 'fs'
import { Schema, Model } from 'mongoose'
class Cache {

	path: string = './cache/';

	constructor() {
	}

	setPath(path: string) {
		this.path = path;
	}

	clearCache() {
		try {
			fs.rmdirSync(this.path, { recursive: true });
		} catch (error) {
			console.log("error while deleting", error);
		}
	}

	readInCache(name: string, schema: Model<any>, query: {}, functionality: number = 1) {
		return new Promise(async (resolve, reject) => {
			fs.readFile(this.path + name + '.json', async (err, data: any) => {
				if (err) {
					let found = functionality == 1 ? await schema.findOne(query) : await schema.find(query);
					if (!!found) {
						this.saveInCache(name, found)
						resolve(found)
					} else resolve(null)
				}
				else {
					resolve(JSON.parse(data))
				}
			})
		})
	}

	async saveInCache(name: string, data: {}) {
		return new Promise((resolve, reject) => {
			fs.mkdir(this.path, { recursive: true }, err => {
				if (err) return reject(err)
				fs.writeFile(this.path + name + '.json', JSON.stringify(data), (err) => {
					if (err) reject(err)
					else resolve(null)
				})
			})
		})
	}
}

export = new Cache();