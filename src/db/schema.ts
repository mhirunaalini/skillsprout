import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/** A completed learning swap that appears in a student's Growth Portfolio. */
export const growthSessions = pgTable("growth_sessions", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  partnerName: text("partner_name").notNull(),
  skill: text("skill").notNull(),
  role: text("role").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  format: text("format").notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }).defaultNow().notNull(),
});
