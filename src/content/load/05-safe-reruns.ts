import type { Section } from '../types'

export const safeReruns: Section = {
  id: 'safe-reruns',
  title: 'Safe re-runs: upserts and atomic writes',
  scene: 'load-safe-reruns',
  narration:
    'A job that runs every night will one day run twice: someone re runs it after a failure, or a scheduler retries it. A pipeline is safe to re run when running it twice leaves the same result as running it once. The word for that is idempotent, and this step makes every output idempotent. The database first. The insert now carries an ON CONFLICT clause, making it what is called an upsert. If a row with that id already exists, the clause updates its fields in place, using excluded, which means the values we just tried to insert. The table at the bottom of the pane shows the difference on the second run: a plain insert raises an IntegrityError, and the upsert quietly updates. The terminal proves it. The job runs twice, and both runs report a hundred and sixty three lines and the same cents. Now the files. Writing a file takes time, and if the program crashes half way through, it leaves half a file, which the next reader would trust. write atomic avoids that. It writes the whole text to a temporary file next to the real one, then calls replace, which renames the temporary file over the real file in one step. The flow at the top of the pane shows it. Anyone reading summary dot json sees either the old file or the new one, never half of one. A crash before the rename leaves the old file untouched and a stray temporary file, and the next run simply writes it again. Both write report and write summary now build their text first and hand it to write atomic. ls lists data slash out: the report, the summary and the warehouse. Next, the whole job in one function.',
}
