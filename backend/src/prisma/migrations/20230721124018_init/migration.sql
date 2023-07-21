-- CreateTable
CREATE TABLE "Questionnaire" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "pages" JSONB NOT NULL,

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("id")
);
