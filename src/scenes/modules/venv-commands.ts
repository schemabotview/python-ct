import type { Scene } from '@graphlearning/flow'

// §5 — the environment life cycle as commands (illustrations the learner is not asked to run), and the
// distribution-versus-import-name table that explains why pip install and import so often differ.
export const venvCommands: Scene = {
  id: 'venv-commands',
  title: 'An environment per project',
  flow: 'TB',
  nodes: [
    {
      id: 'commands',
      kind: 'code',
      filename: 'terminal  (illustration)',
      label: `python -m venv .venv               # create the environment
source .venv/bin/activate          # Windows: .venv\\Scripts\\activate
python -m pip install python-dateutil   # into .venv only
python -m pip list                 # what it contains
python -m pip freeze > requirements.txt # record exact versions
deactivate                         # leave it`,
    },
    {
      id: 'names',
      kind: 'table',
      label: 'pip install one name, import another',
      headers: ['Distribution (pip install)', 'Import name'],
      values: [
        ['python-dateutil', 'dateutil'],
        ['pillow', 'PIL'],
        ['beautifulsoup4', 'bs4'],
        ['scikit-learn', 'sklearn'],
        ['PyYAML', 'yaml'],
      ],
    },
  ],
  edges: [{ source: 'commands', target: 'names', label: 'two kinds of name' }],
}
