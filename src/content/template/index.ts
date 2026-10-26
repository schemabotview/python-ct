import type { Course, Section } from '../types'

// TEMPORARY — the infra step's template frames (see src/scenes/template). Not course content: the
// narration is a label, and the course is deleted when Course 2 (the pilot) lands.
const frame = (id: string, title: string, scene: string): Section => ({
  id, title, scene, narration: `Template frame: ${title}. Infrastructure check only; removed before the pilot.`,
})

export const template: Course = {
  id: 'template',
  title: 'Template frames (temporary)',
  sections: [
    frame('pipeline-map', 'The pipeline map', 'pipeline-map'),
    frame('ide-memory', 'IDE frame, memory diagram', 'template-memory'),
    frame('ide-plot', 'IDE frame, plot', 'template-plot'),
    frame('ide-map-pane', 'IDE frame, map pane', 'template-map-pane'),
  ],
}
