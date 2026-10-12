import type { Section } from '../types'

// The @ syntax is explained only as 'marks a decorator; Chapter 9 explains how they work'. The rewrite table (line.total() is LineItem.total(line)) is what makes self stop being magic.
export const methodsSelfAndClassMethods: Section = {
  id: 'methods-self-and-class-methods',
  title: "Methods, self, class methods, and static methods",
  scene: 'method-kinds',
  focus: 'methods',
  slide: `## Methods, self, and class and static methods

A **method** is a function defined inside a class.

### Instance methods
- \`def total(self)\`: \`self\` is the instance it was called on
- \`line.total()\` is really \`LineItem.total(line)\`

### Class methods
- \`@classmethod\` receives the **class**, as \`cls\`
- Good for alternative constructors: \`LineItem.from_text("tea,3,4.5")\`
- A subclass gets its **own** type back

### Static methods
- \`@staticmethod\` receives **neither**: a plain function kept with its class
- The \`@\` marks a **decorator**; Chapter 9 explains how they work

### Common mistakes
- \`def total():\` with no \`self\` raises \`TypeError\` when called`,
  narration:
    "A method is simply a function defined inside a class. Look at total in the code card. It has one parameter, self, and when we write line dot total, Python passes line as that first argument. The table shows exactly what Python runs: line dot total is the same as LineItem dot total with line passed in. Once you see that, self stops being magic. It is just the first argument, which Python fills in for you. Call the method on the class without an instance and you get a TypeError, because self is missing. The second kind is a class method. The line above it begins with an at sign, which marks a decorator. We will explain exactly how decorators work in Chapter 9, so for now read it as a label that changes how the function below it behaves. A class method receives the class itself, conventionally named cls, instead of an instance. The classic use is an alternative constructor. From text takes a string like tea comma three comma four point five, splits it, converts the pieces, and returns cls of those values, a new instance. Because it uses cls rather than the name LineItem, a subclass that inherits it gets an instance of the subclass back. The third kind is a static method, which receives neither self nor cls. It is just an ordinary function that lives in the class's namespace because it belongs with the class conceptually, such as checking whether a quantity is valid. Two mistakes: defining a method without self, so that calling it on an instance raises a TypeError complaining about the extra argument, and calling an instance method on the class without passing an instance. Most of your methods will be ordinary instance methods. Reach for a class method when you need a different way to build an instance, and a static method rarely. Next, a shortcut for classes that mostly hold data.",
}
