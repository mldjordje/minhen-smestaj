import { db } from "@/lib/db";
import type { ActivityLogEntityType } from "@/lib/types";

type ActivityLogPayload = {
  action: string;
  actor: string;
  entityId: string;
  entityType: ActivityLogEntityType;
  message: string;
  metadata?: Record<string, unknown>;
};

let ensureActivityLogTablePromise: Promise<void> | null = null;

async function ensureActivityLogTable() {
  if (!db) {
    return;
  }

  if (!ensureActivityLogTablePromise) {
    ensureActivityLogTablePromise = db`
      create table if not exists activity_log (
        id bigserial primary key,
        entity_type text not null,
        entity_id text not null,
        action text not null,
        actor text not null,
        message text not null,
        metadata jsonb not null default '{}'::jsonb,
        created_at timestamptz not null default now()
      )
    `.then(() => undefined);
  }

  await ensureActivityLogTablePromise;
}

export async function writeActivityLog(payload: ActivityLogPayload) {
  if (!db) {
    return;
  }

  await ensureActivityLogTable();

  await db`
    insert into activity_log (
      entity_type,
      entity_id,
      action,
      actor,
      message,
      metadata
    ) values (
      ${payload.entityType},
      ${payload.entityId},
      ${payload.action},
      ${payload.actor},
      ${payload.message},
      ${JSON.stringify(payload.metadata ?? {})}
    )
  `;
}
