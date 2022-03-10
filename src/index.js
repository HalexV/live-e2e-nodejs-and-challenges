import Server from "./server.js"

const server = (new Server()).getServer()

server.listen(3000)
.on("listening", () => console.log(`running at ${server.address().port}`))