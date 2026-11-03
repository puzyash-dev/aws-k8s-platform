const express = require("express");
const { Pool } = require("pg");
const { createClient } = require("redis");

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/appdb"
});

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

async function start() {
  await redisClient.connect();
  
  app.use(express.json());

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "healthy", timestamp: new Date() });
  });

  app.get("/api/data", async (req, res) => {
    try {
      let visits = await redisClient.get("visit_count");
      visits = visits ? parseInt(visits) + 1 : 1;
      await redisClient.set("visit_count", visits);

      const dbRes = await pool.query("SELECT NOW() as now");
      
      res.json({
        message: "Hello from AWS K8s Platform API!",
        visits: visits,
        dbTime: dbRes.rows[0].now
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start();

