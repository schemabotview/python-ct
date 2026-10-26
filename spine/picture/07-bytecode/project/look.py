import ast
import dis
import io
import tokenize

import pricing

source = "price * quantity"
for token in tokenize.generate_tokens(io.StringIO(source).readline):
    if token.string.strip():
        print(tokenize.tok_name[token.type], repr(token.string))
print(ast.dump(ast.parse(source, mode="eval").body))
dis.dis(pricing.line_total)
