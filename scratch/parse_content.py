import re
import json

def parse_content():
    with open("c:/COOOY/PHOENIX/CONTENT.md", "r", encoding="utf-8") as f:
        content = f.read()

    content = content.replace('\r\n', '\n')
    sections = re.split(r'\n#\s+', content)
    
    challenges = []
    
    for i, sec in enumerate(sections):
        lines = sec.strip().split('\n')
        if not lines:
            continue
        title = lines[0].strip()
        body = '\n'.join(lines[1:])
        
        if 'challenge' in title.lower() and ('easy' in title.lower() or 'medium' in title.lower() or 'hard' in title.lower()):
            parts = [p.strip() for p in title.split('---')]
            if len(parts) < 2:
                continue
                
            char_part = parts[0]
            char_name = re.sub(r'^\d+\.\s*', '', char_part).strip()
            
            challenge_part = parts[1]
            m_chal = re.search(r'(Easy|Medium|Hard)\s+Challenge\s+(\d+)', challenge_part, re.IGNORECASE)
            if not m_chal:
                continue
            difficulty = m_chal.group(1).lower().strip()
            index = m_chal.group(2).strip()
            
            # Find ID
            id_match = re.search(r'```\s*(?:text)?\s*\n(.*?)\n```', body, re.DOTALL)
            if not id_match:
                continue
            chal_id = id_match.group(1).strip()
            
            # Find Scenario
            scen_match = re.search(r'##\s*Scenario\s*\n(.*?)(?=\n##|$)', body, re.DOTALL)
            scenario = ""
            if scen_match:
                scenario = scen_match.group(1).strip()
                scenario = re.sub(r'^>\s*', '', scenario, flags=re.MULTILINE)
                scenario = scenario.replace('\n', ' ').strip()
            
            # Find Question
            q_match = re.search(r'##\s*Question\s*\n(.*?)(?=\n##|$)', body, re.DOTALL)
            question = ""
            if q_match:
                question = q_match.group(1).strip()
                question = re.sub(r'^>\s*', '', question, flags=re.MULTILINE)
                question = question.replace('**', '').replace('\n', ' ').strip()
                
            # Find Options
            opt_match = re.search(r'###\s*Options\s*\n(.*?)(?=\n###\s*Correct|\n##|$)', body, re.DOTALL)
            options = []
            correct_option_id = None
            if opt_match:
                opt_text = opt_match.group(1).strip()
                opt_text = re.sub(r'^>\s*', '', opt_text, flags=re.MULTILINE)
                # Split options
                opt_blocks = re.split(r'\n+(?=\*?\*?[A-D]\.\*?\*?)', opt_text)
                for block in opt_blocks:
                    block = block.strip()
                    if not block:
                        continue
                    m_opt = re.match(r'^\*?\*?([A-D])\.\*?\*?\s*(.*)', block, re.DOTALL)
                    if m_opt:
                        opt_id = m_opt.group(1).lower().strip()
                        opt_label = m_opt.group(2).strip().replace('\n', ' ').replace('**', '').replace('*', '')
                        options.append({
                            "id": opt_id,
                            "label": opt_label,
                            "description": "",
                            "isCorrect": False,
                            "scoreBonus": 0,
                            "feedback": ""
                        })
            
            # Find Correct option
            correct_match = re.search(r'###\s*Correct\s*\n(.*?)(?=\n##|$)', body, re.DOTALL)
            if correct_match:
                correct_text = correct_match.group(1).strip().replace('**', '').replace('`', '')
                correct_text = re.sub(r'^>\s*', '', correct_text, flags=re.MULTILINE)
                m_corr = re.search(r'([A-D])', correct_text, re.IGNORECASE)
                if m_corr:
                    correct_option_id = m_corr.group(1).lower().strip()
                    
            # Find Explanation
            exp_match = re.search(r'##\s*Explanation\s*\n(.*?)(?=\n##|$)', body, re.DOTALL)
            explanation = ""
            if exp_match:
                explanation = exp_match.group(1).strip()
                explanation = re.sub(r'^>\s*', '', explanation, flags=re.MULTILINE)
                explanation = explanation.replace('\n', ' ').strip()
                
            # Set default isCorrect in options
            for opt in options:
                if opt["id"] == correct_option_id:
                    opt["isCorrect"] = True
                    opt["scoreBonus"] = 20 if difficulty == "easy" else (40 if difficulty == "medium" else 60)
                    opt["feedback"] = f"Correct! {explanation}"
                else:
                    opt["feedback"] = "Not quite. Think about what the user is experiencing. Let's try again!"
            
            # Accessibility Category mapping based on character
            category = "visual"
            char_id = "rahul"
            if "fatima" in char_name.lower():
                category = "auditory"
                char_id = "fatima"
            elif "mira" in char_name.lower() or "color" in char_name.lower():
                category = "visual"
                char_id = "grandma"
                
            # Add dynamic transformation field
            trans_type = "aria-labels"
            if category == "auditory":
                trans_type = "captions"
            elif char_id == "grandma":
                trans_type = "color-indicators"
                
            challenges.append({
                "id": chal_id,
                "characterId": char_id,
                "category": category,
                "difficulty": difficulty,
                "title": f"{char_name} {difficulty.capitalize()} Challenge {index}",
                "scenario": scenario,
                "description": scenario,
                "question": question,
                "explanation": explanation,
                "accessibilityPrinciple": "WCAG Accessibility Rule",
                "options": options,
                "points": 100 if difficulty == "easy" else (200 if difficulty == "medium" else 300),
                "rewardCredits": 20 if difficulty == "easy" else (30 if difficulty == "medium" else 40),
                "transformation": {
                    "type": trans_type
                }
            })
            
    print(f"Parsed {len(challenges)} challenges successfully.")
    with open("c:/COOOY/PHOENIX/src/data/parsed_challenges.json", "w", encoding="utf-8") as out:
        json.dump(challenges, out, indent=2)

if __name__ == "__main__":
    parse_content()
