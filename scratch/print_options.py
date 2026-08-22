import re

opt_text = '**A.** Make the icons more colorful.\n\n**B.** Add clear, descriptive labels.\n\n**C.** Add an animation when the buttons appear.\n\n**D.** Make the icons smaller.'

blocks = re.split(r'\n+(?=\*?\*?[A-D]\.\*?\*?)', opt_text)
for block in blocks:
    m = re.match(r'^\*?\*?([A-D])\.\*?\*?\s*(.*)', block, re.DOTALL)
    if m:
        print(f"ID: {m.group(1)}, Label: {m.group(2)}")
    else:
        print(f"Failed to match block: {repr(block)}")
