alter table "card_scheduling"
  add column "stability_fast" double precision not null default 0;

alter table "card_scheduling"
  add column "schedule_status" text not null default 'new';

alter table "card_scheduling"
  add column "learning_step" integer;