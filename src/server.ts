import app from "./app";

async function main() {
  app.listen(3000);
}

main()
  .then(() => {
    console.log("Server started successfully");
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
