-- CreateTable
CREATE TABLE "Questionnaire" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "questionnaireId" INTEGER NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Input" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "required" BOOLEAN,
    "options" TEXT[],
    "recommendationValue" TEXT,
    "pageId" INTEGER NOT NULL,

    CONSTRAINT "Input_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ButtonInput" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "pageId" INTEGER NOT NULL,

    CONSTRAINT "ButtonInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConditionalNavigation" (
    "id" SERIAL NOT NULL,
    "targetPageId" INTEGER NOT NULL,
    "pageId" INTEGER NOT NULL,
    "conditions" JSONB NOT NULL,

    CONSTRAINT "ConditionalNavigation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConditionalCheck" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "sourceQuestion" TEXT NOT NULL,
    "requiredValue" TEXT,
    "pageId" INTEGER NOT NULL,

    CONSTRAINT "ConditionalCheck_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "Questionnaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Input" ADD CONSTRAINT "Input_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
