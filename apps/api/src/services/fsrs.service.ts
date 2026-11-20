import { DefaultScheduler, Rating } from "ts-fsrs";
import { prisma } from "../db.js";
import AppError from "../classes/app-error.js";
import { logger } from "../lib/logger.js";

const ratingMap = {
  1: Rating.Again,
  2: Rating.Hard,
  3: Rating.Good,
  4: Rating.Easy,
} as const;

async function getFSRSCard(cardId: string, userId: string) {
  const dbCard = await prisma.cards.findFirst({
    where: {
      id: cardId,
      decks: {
        user_id: userId
      }
    },
    select: {
      card_scheduling: {
        select: {
          due_at: true,
          stability: true,
          difficulty: true,
          state: true,
          reps: true,
          lapses: true,
          last_reviewed_at: true,
          elapsed_days: true,
          scheduled_days: true,
          stability_fast: true,
          schedule_status: true,
          learning_step: true,
        }
      },
    },
  });

  if (!dbCard?.card_scheduling) {
    throw new Error("Card not found")
  }
  
  if (dbCard.card_scheduling.state < 0 || dbCard.card_scheduling.state > 3 || !Number.isInteger(dbCard.card_scheduling.state)) {
    throw new Error("Invalid FSRS state");
  }

  const validScheduleStatuses = ["new", "learning", "review"] as const;
  
  if (!validScheduleStatuses.includes(
    dbCard.card_scheduling.schedule_status as typeof validScheduleStatuses[number],
  )) {
    throw new Error("Invalid FSRS schedule status");
  }
  
  const dbCardS = dbCard.card_scheduling;
  const stateBefore = dbCardS.state;
  const card = {
    cardId,
    dueAt: dbCardS.due_at,
    lastReviewAt: dbCardS.last_reviewed_at,
    stability: dbCardS.stability,
    stabilityFast: dbCardS.stability_fast,
    difficulty: dbCardS.difficulty,
    state: stateBefore as 0 | 1 | 2 | 3,
    reps: dbCardS.reps,
    lapses: dbCardS.lapses,
    scheduledDays: dbCardS.scheduled_days,
    scheduleStatus: dbCardS.schedule_status as "new" | "learning" | "review",
    learningStep: dbCardS.learning_step ?? undefined,
  };

  return { card, stateBefore }
}

export async function fsrsReview(userId: string, cardId: string, ratingValue: 1 | 2 | 3 | 4) {
  logger.info({ cardId, userId }, "review: before scheduler");
  const scheduler = await DefaultScheduler();
  const rating = ratingMap[ratingValue];

  logger.info({ cardId, userId }, "review: before card lookup");
  
  const getFsrsCard = (await getFSRSCard(cardId, userId));
  const fsrsCard = getFsrsCard.card;
  const stateBefore = getFsrsCard.stateBefore;
  logger.info({ cardId, userId }, "review: after card lookup");
  
  if (rating === undefined) {
      throw new AppError("Invalid rating", 400);
  }
  
  const result = scheduler.review({
    card: fsrsCard,
    grade: rating,
    now: new Date(),
  });
  
  logger.info({ cardId, userId }, "review: after fsrs calculation, before transaction");
  
  const reviewedAt = new Date();
  
  await prisma.$transaction(async (transaction) => {
    logger.info({ cardId, userId }, "review: inside transaction");
    await transaction.reviews.create({
      data: {
        card_id: cardId,
        user_id: userId,
        rating: ratingValue,
        reviewed_at: reviewedAt,
        response_time_ms: null,
        state_before: stateBefore,
        state_after: result.card.state
      },
    });

    await transaction.card_scheduling.update({
      where: {
        card_id: cardId,
      },
      data: {
        due_at: result.card.dueAt,
        stability: result.card.stability,
        stability_fast: result.card.stabilityFast,
        difficulty: result.card.difficulty,
        state: result.card.state,
        reps: result.card.reps,
        lapses: result.card.lapses,
        scheduled_days: result.card.scheduledDays,
        schedule_status: result.card.scheduleStatus,
        learning_step: result.card.learningStep ?? null,
        last_reviewed_at: reviewedAt,
        updated_at: reviewedAt
      },
    });
  });

  logger.info({ cardId, userId }, "review: after transaction");
  
  return {
    cardId,
    rating: ratingValue,
    scheduling: {
      dueAt: result.card.dueAt,
      state: result.card.state,
      scheduleStatus: result.card.scheduleStatus,
      stability: result.card.stability,
      difficulty: result.card.difficulty,
      reps: result.card.reps,
      lapses: result.card.lapses,
    },
  };
}