import type { Section } from '../types'

export const counterAndDefaultdict: Section = {
  id: 'counter-and-defaultdict',
  title: 'Counter and defaultdict',
  scene: 'transform-counter',
  narration:
    "Grouping is so common that the standard library's collections module has two tools built for it. A defaultdict is a dictionary that creates a missing key the moment you touch it, using a function you give it. revenue is now a defaultdict of Decimal. Calling Decimal with no arguments gives zero, so the first time a product appears, its entry springs into existence at zero, and plus equals simply adds to it. The get call is gone. The diagram at the top of the pane shows that first touch for the Brazilian coffee, on order ten oh six: the key did not exist, it is created at zero, and thirty two fifty is added. A Counter is a dictionary built for counting, where missing keys also start at zero. main dot py now uses two. bags counts how many bags of each product were sold, by adding each line's quantity, and customers counts how many order lines each customer placed, by adding one. Counters come with useful methods of their own, and most common is the one the shop wants: the best customers. The terminal shows revenue and bags side by side for each product, in the table in the middle of the pane, and then the top three customers: Maya and Ana with twenty three lines each, and Lena with twenty two. When two counts are equal, most common keeps them in the order they were first seen, so the answer is the same on every run. Look at the bags column. Ethiopian sells the most bags by far, two hundred and sixty four, but it earns less than Kenyan or Colombian. Which product is top depends entirely on what you rank by. Next, ranking.",
}
