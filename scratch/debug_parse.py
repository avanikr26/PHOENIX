import re

with open("c:/COOOY/PHOENIX/CONTENT.md", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('\r\n', '\n')
sections = re.split(r'\n#\s+', content)
print(f"Total sections split: {len(sections)}")
for i, s in enumerate(sections[:25]):
    lines = s.strip().split('\n')
    if lines:
        print(f"Section {i}: {lines[0]}")
