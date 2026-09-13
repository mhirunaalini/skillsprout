import { db } from "@/db";
import { growthSessions } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

const MAX_TEXT_LENGTH = 100;

type SessionPayload = {
  partnerName?: unknown;
  skill?: unknown;
  role?: unknown;
  durationMinutes?: unknown;
  format?: unknown;
};

function isShortString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= MAX_TEXT_LENGTH;
}

export async function GET() {
  const sessions = await db
    .select()
    .from(growthSessions)
    .orderBy(desc(growthSessions.completedAt))
    .limit(12);

  return Response.json({ sessions });
}

export async function POST(request: Request) {
  const body = (await request.json()) as SessionPayload;
  const duration = Number(body.durationMinutes);

  if (
    !isShortString(body.partnerName) ||
    !isShortString(body.skill) ||
    !isShortString(body.role) ||
    !isShortString(body.format) ||
    !Number.isInteger(duration) ||
    duration < 15 ||
    duration > 120
  ) {
    return Response.json({ error: "Please provide valid session details." }, { status: 400 });
  }

  const [created] = await db
    .insert(growthSessions)
    .values({
      studentName: "Maya Chen",
      partnerName: body.partnerName.trim(),
      skill: body.skill.trim(),
      role: body.role.trim(),
      durationMinutes: duration,
      format: body.format.trim(),
    })
    .returning();

  return Response.json({ session: created }, { status: 201 });
}
