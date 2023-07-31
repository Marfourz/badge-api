-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "matricule" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3),
    "birthplace" TEXT,
    "bloodType" TEXT,
    "grade" TEXT,
    "pvNumber" TEXT,
    "printingDate" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
