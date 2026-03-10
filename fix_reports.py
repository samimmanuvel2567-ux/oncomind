#!/usr/bin/env python3

# Read the current file
with open(r'c:\Study\Oncomind\frontend\index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and remove the two redundant card divs (lines 1010-1023)
# We need to remove from line 1010 to 1023 (0-indexed: 1009 to 1022)
new_lines = []
i = 0
while i < len(lines):
    # Check if we're at the start of the File Preview card (around line 1010)
    if i >= 1009 and 'File Preview' in lines[i] and '️' in lines[i]:
        # Skip this card and the next card (Structured Report)
        # Find the end of the Structured Report card
        card_count = 0
        start_i = i - 1  # Start from the <div class="card fade-in">
        while i < len(lines):
            if '<div class="card fade-in">' in lines[i]:
                card_count += 1
            if '</div>' in lines[i] and card_count > 0:
                # Check if this closes both cards
                if card_count == 2 and lines[i].strip() == '</div>':
                    i += 1
                    break
                # Simple check: if the indent reduces, we might be done
                if lines[i].startswith('                        </div>'):  # This is the closing of the reports div
                    break
            i += 1
        
        # Add the replacement card
        new_lines.append('                        <div class="card fade-in">\n')
        new_lines.append('                            <div class="card-title">📋 Uploaded Reports</div>\n')
        new_lines.append('                            <div style="background: #f9f9f9; padding: 20px; border-radius: 12px;">\n')
        new_lines.append('                                <p style="color: #666; text-align: center;">No reports uploaded yet</p>\n')
        new_lines.append('                            </div>\n')
        new_lines.append('                        </div>\n')
    else:
        new_lines.append(lines[i])
        i += 1

# Write back
with open(r'c:\Study\Oncomind\frontend\index.html', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("✓ Successfully replaced cards in reports page")
