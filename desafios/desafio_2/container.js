const fs = require("fs");

class Container {
  constructor(data) {
    this.data = data;
    this.object = this.readData(this.data) || [];
  }

  async save(obj) {
    try {
      const data = await this.getAll()
      const newId = data.length + 1
      const newData = {...obj, id: newId}
      data.push(newData)
      this.reWriteData(data)
      return newId
    } catch (error) {
        consol.log(error)
    }
  }

  async getById(id) {
    try {
      this.object = await this.getAll()
      return this.object.filter((e) => e.id === Number(id))
    } catch (error) {
        consol.log(error)
    }
  }
  async getAll() {
    try {
      const data = await this.readData(this.data)
      return data
    } catch (error) {
        console.log(error)
    }
  }

  async deleteById(id) {
    try {
      const data = await this.getAll()
      this.object = data.filter((e) => e.id !== Number(id))
      this.reWriteData(this.object)
    } catch (error) {
        console.log(error)
    }
  }

  async deleteAll() {
    try {
      this.object = []
      this.reWriteData(this.object)
    } catch (error) {
        console.log(error)
    }
  }

  readData(path) {
    const obj = JSON.parse(fs.readFileSync(path, 'utf-8'))
    return obj
  }

  reWriteData(object) {
    fs.writeFileSync(this.data, JSON.stringify(object, null, 2))
  }
}

module.exports = Container;