import { server } from "./app";

async function main() {
  server.listen(3000, () => {
    console.log("Server started on port 3000");
  });
}

main();
