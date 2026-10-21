import type { Scene, SceneNode } from '@graphlearning/flow'

const tile = (id: string, label: string, icon: string): SceneNode => ({ id, label, icon, variant: 'tile', pattern: 'network' })
const domain = (id: string, label: string, sub: string, pattern: SceneNode['pattern'], tiles: SceneNode[]): SceneNode =>
  ({ id, label, sub, pattern, icon: 'none', cols: 3, children: tiles.map((t) => ({ ...t, pattern })) })

export const landscape: Scene = {
  id: 'python-landscape',
  padding: 0.04,
  flow: 'LR',
  align: 'start',
  header: 'band',
  nodes: [
    {
      id: 'what',
      kind: 'list',
      pills: true,
      icon: 'python',
      label: 'Python',
      sub: 'a general-purpose programming language',
      pattern: 'network',
      items: [
        'High-level — you say what to do, not how the machine does it',
        'Interpreted — run the file; no separate compile step',
        'Dynamically typed — values carry their types, names do not',
        'Garbage-collected — memory is reclaimed for you',
        'Multi-paradigm — scripts, functions and objects all fit',
      ],
    },
    {
      id: 'where',
      label: 'Where it runs',
      sub: 'the same language in every one of these jobs',
      pattern: 'group',
      icon: 'none',
      cols: 2,
      children: [
        domain('web', 'Web and APIs', 'sites and services', 'service', [tile('django', 'Django', 'django'), tile('flask', 'Flask', 'flask'), tile('fastapi', 'FastAPI', 'fastapi')]),
        domain('analysis', 'Data analysis', 'tables and notebooks', 'storage', [tile('pandas', 'pandas', 'pandas'), tile('numpy', 'NumPy', 'numpy'), tile('jupyter', 'Jupyter', 'jupyter')]),
        domain('ml', 'Machine learning and AI', 'models and training', 'user', [tile('pytorch', 'PyTorch', 'pytorch'), tile('tensorflow', 'TensorFlow', 'tensorflow'), tile('sklearn', 'scikit-learn', 'sklearn')]),
        domain('engineering', 'Data engineering', 'pipelines and warehouses', 'network', [tile('airflow', 'Airflow', 'airflow'), tile('spark', 'PySpark', 'spark'), tile('duckdb', 'DuckDB', 'duckdb')]),
        domain('devops', 'DevOps and cloud', 'infrastructure as code', 'external', [tile('ansible', 'Ansible', 'ansible'), tile('sdk', 'Cloud SDKs', 'cloud'), tile('cli', 'CLI tools', 'terminal')]),
        domain('everyday', 'Everyday automation', 'the boring parts of a job', 'group', [tile('files', 'Files', 'folder'), tile('sheets', 'Spreadsheets', 'table'), tile('pages', 'Web pages', 'globe')]),
      ],
    },
  ],
  edges: [{ source: 'what', target: 'where', label: 'used for' }],
}
