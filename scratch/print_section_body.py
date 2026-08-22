import re

with open("c:/COOOY/PHOENIX/CONTENT.md", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('\r\n', '\n')
sections = re.split(r'\n#+\s+', content)

for i, s in enumerate(sections):
    lines = s.strip().split('\n')
    if lines and '19. Rahul --- Easy Challenge 01' in lines[0]:
        print(f"--- Raw Body of Section {i} ---")
        print(repr(s))
        break
