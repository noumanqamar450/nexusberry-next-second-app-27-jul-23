-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "extraPrice" INTEGER NOT NULL,
    "limitPrice" INTEGER NOT NULL,
    "attribute" JSONB,
    "freeShipping" BOOLEAN NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
