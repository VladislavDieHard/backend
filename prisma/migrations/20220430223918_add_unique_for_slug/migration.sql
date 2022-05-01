/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Affiche` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Rubric` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Affiche_slug_key` ON `Affiche`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Department_slug_key` ON `Department`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Entry_slug_key` ON `Entry`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Rubric_slug_key` ON `Rubric`(`slug`);
