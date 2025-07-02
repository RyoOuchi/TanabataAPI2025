-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "stage" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);
