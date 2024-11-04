import { Client } from "@libsql/client/.";
import { LibSQLDatabase } from "drizzle-orm/libsql";

export type Database = LibSQLDatabase<Record<string, never>> & {
  $client:Client;
}
