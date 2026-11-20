alter table "card_scheduling"
  add column "elapsed_days" integer not null default 0;

alter table "card_scheduling"
  add column "scheduled_days" integer not null default 0;