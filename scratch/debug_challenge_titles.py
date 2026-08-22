import re

with open("c:/COOOY/PHOENIX/CONTENT.md", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('\r\n', '\n')
sections = re.split(r'\n#+\s+', content)

for i, s in enumerate(sections):
    lines = s.strip().split('\n')
    if lines:
        title = lines[0].strip()
        if 'challenge' in title.lower():
            print(f"Index {i}: Title: '{title}'")
