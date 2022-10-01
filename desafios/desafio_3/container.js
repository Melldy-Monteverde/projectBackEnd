const fs = require('fs');

class Container {
	constructor(fileName) {
		this.fileName = fileName;
	}

	addId(data) {
		const ids = data.map((item) => item.id);
		const maxId = Math.max(...ids);
		let addId = maxId === -Infinity ? 0 : maxId;
		addId++;
		return addId;
	}

	async save(product) {
		try {
			if (fs.existsSync(this.fileName)) {
				const content = await fs.promises.readFile(this.fileName, 'utf-8');
				if (content) {
					const data = JSON.parse(content);
					const id = this.addId(data);
					const newProduct = {
						id,
						...product,
					};
					data.push(newProduct);
					await fs.promises.writeFile(
						this.fileName,
						JSON.stringify(data, null, 2)
					);
				} else {
					const newProduct = {
						id: 1,
						...product,
					};
					await fs.promises.writeFile(
						this.fileName,
						JSON.stringify([newProduct], null, 2)
					);
				}
			} else {
				const newProduct = {
					id: 1,
					...product,
				};
				await fs.promises.writeFile(
					this.fileName,
					JSON.stringify([newProduct], null, 2)
				);
			}
		} catch (error) {
			console.log(error);
		}
	}

	async getById(id) {
		try {
			const content = await fs.promises.readFile(this.fileName, 'utf-8');
			if (content) {
				const data = JSON.parse(content);
				return (
					data.find((item) => item.id === id) ||
					new Error('id not found')
				);
			} else {
				throw new Error('id cant displayed');
			}
		} catch (error) {
			console.log(error);
		}
	}

	async getAll() {
		try {
			const content = await fs.promises.readFile(this.fileName, 'utf-8');
			if (content) {
				const data = JSON.parse(content);
				return data;
			} else {
				throw new Error('no product found to display');
			}
		} catch (error) {
			console.log(error);
		}
	}

	async deleteById(id) {
		try {
			const content = await fs.promises.readFile(this.fileName, 'utf-8');
			if (content) {
				const data = JSON.parse(content);
				const newProductList = data.filter((item) => item.id !== id);
				await fs.promises.writeFile(
					this.fileName,
					JSON.stringify(newProductList, null, 2)
				);
			} else {
				throw new Error('no product found to delete');
			}
		} catch (error) {
			console.log(error);
		}
	}

	async deleteAll() {
		try {
			await fs.promises.writeFile(this.fileName, JSON.stringify([]));
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Container;