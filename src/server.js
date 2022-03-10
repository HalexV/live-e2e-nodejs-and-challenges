import {
  createServer
} from 'http'
import {
  once
} from 'events'
import {
  randomUUID
} from 'crypto'

class Server {
  constructor() {
    this.database = new Map()
  }

 respondJSON(data, response) {
    return response.end(JSON.stringify(data))
  }
  
  async handler(request, response) {
    const {
      method
    } = request
  
    if (method === 'GET') {
  
      return this.respondJSON([...this.database.values()], response)
    }
  
    if (method === 'POST') {
      const body = JSON.parse(await once(request, 'data'))
      console.log('recebido', body)
      const id = randomUUID()
      this.database.set(id, body)
  
      return this.respondJSON({
        ok: 1
      }, response)
    }
  
    if (method === 'DELETE') {
      this.database.clear()
      return this.respondJSON({
        ok: 1
      }, response);
    }
  }

  getServer() {
    return createServer(this.handler.bind(this))
  }
}





export default Server