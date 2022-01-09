import { Client } from "pg";

export const client = new Client({
  user: "kvwnnbklxemlfr",
  host: "ec2-107-20-24-247.compute-1.amazonaws.com",
  database: "de1kesrte1ut12",
  password: "ff48c62309c32a67e629c5a90b09724832775467e2dfe8fd051b59062a315e83",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});
