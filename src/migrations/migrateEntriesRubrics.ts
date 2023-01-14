import { insert, select } from './select';
import { normalize_db, new_db } from './db';

export async function migrateEntriesRubrics() {
  const entries = await select(normalize_db, `SELECT id, rubricId FROM Entry`);

  for (const entry of entries) {
    await insert(
      new_db,
      `INSERT INTO RubricsOnEntries (entryId, rubricId) VALUES ('${entry.id}', '${entry.rubricId}')`,
    );
  }
}
