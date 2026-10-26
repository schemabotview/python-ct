import type { Section } from '../types'

export const whatWeWillBuild: Section = {
  id: 'what-we-will-build',
  title: 'What we will build',
  scene: 'pipeline-map',
  narration:
    "This course does not teach Python as a list of features. It builds one application, from an empty folder to a tested, packaged job that runs on a schedule, and each feature arrives at the moment the application needs it. Here it is. A small coffee roastery's shop writes one file of orders every day: who ordered which coffee, and how many bags. Alongside those files there is a catalogue of products and their prices, and later in the course, an orders service on the network as well. Those are the sources, at the top. Our pipeline reads them, in the stage called extract. It checks every row, keeping the good ones and reporting the bad ones instead of crashing or, worse, silently getting a number wrong. That is validate. It prices every line and applies the discounts, which is transform, and then it adds the results up by product, by day and by customer, which is aggregate. Finally it writes what it found: a report people can read, a summary other programs can read, and a small database that can be safely loaded again and again. That is load, and those are the outputs at the bottom. Under each stage you can see the course that builds it, and the Python it is built from. Every stage is plain Python, using only the standard library. Courses two to seven build that script, starting with a single file. The purple rail at the bottom is the second half of the course: the same pipeline, turned into a package, modelled with objects, tested, measured, sped up and shipped. Before we start, there is one more thing to understand: what happens when Python runs your code.",
}
