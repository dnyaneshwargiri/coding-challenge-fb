-- CreateTable
CREATE TABLE "QuestionResponseModel" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "answer" TEXT NOT NULL,
    "userResponsesId" INTEGER,

    CONSTRAINT "QuestionResponseModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "questionId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "options" TEXT[],
    "minValue" INTEGER,
    "maxValue" INTEGER,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "Recommendation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserResponses" (
    "responseId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "responses" JSONB[],

    CONSTRAINT "UserResponses_pkey" PRIMARY KEY ("responseId")
);

-- AddForeignKey
ALTER TABLE "QuestionResponseModel" ADD CONSTRAINT "QuestionResponseModel_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("questionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResponses" ADD CONSTRAINT "UserResponses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
