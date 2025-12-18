import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const PORT = 3001;

// CORS configuration
app.use(cors());

/**
 * JWT Token endpoint for Metabase embedding
 *
 * In production:
 * - Authenticate the user first
 * - Check permissions
 * - Use environment variables for secrets
 * - Add proper error handling
 */
app.get("/api/auth/metabase/:instance", (req, res) => {
  const { instance } = req.params;

  // Demo configuration - replace with your actual values
  const METABASE_CONFIG = {
    instance1: {
      METABASE_SECRET_KEY:
        process.env.METABASE_SECRET_KEY_1 || "YOUR_SECRET_KEY",
    },
    instance2: {
      METABASE_SECRET_KEY:
        process.env.METABASE_SECRET_KEY_2 || "YOUR_SECRET_KEY",
    },
  };

  const config = METABASE_CONFIG[instance];

  if (!config) {
    return res.status(404).json({ error: "Instance not found" });
  }

  // Create JWT token
  const payload = {
    email: "test@test.co",
    first_name: "test",
    last_name: "test",
    exp: Math.round(Date.now() / 1000) + 60 * 10, // 10 minutes expiration
  };

  try {
    const token = jwt.sign(payload, config.METABASE_SECRET_KEY);
    res.json({
      jwt: token,
    });
  } catch (error) {
    console.error("JWT signing error:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 JWT Auth Server running on http://localhost:${PORT}`);
  console.log(`📝 Endpoints:`);
  console.log(`   - http://localhost:${PORT}/api/auth/metabase/instance1`);
  console.log(`   - http://localhost:${PORT}/api/auth/metabase/instance2`);
});
