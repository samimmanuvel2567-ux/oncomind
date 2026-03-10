import re

# Read the file
with open(r'c:\Study\Oncomind\frontend\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and remove the redundant File Preview and Structured Report cards
# Pattern: Find the two cards that come after the upload form and remove them
pattern = r'</form>\s*<div class="card fade-in">\s*<div class="card-title">[^<]*File Preview[^<]*</div>.*?</div>\s*<div class="card fade-in">\s*<div class="card-title">[^<]*Structured Report[^<]*</div>.*?</div>'

replacement = '''</form>
                <div class="card fade-in">
                  <div class="card-title">📋 Uploaded Reports</div>
                  <div style="background: #f9f9f9; padding: 20px; border-radius: 12px;">
                    <p style="color: #666; text-align: center;">No reports uploaded yet</p>
                  </div>
                </div>'''

# Use DOTALL flag to make . match newlines
content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write back
with open(r'c:\Study\Oncomind\frontend\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Successfully removed redundant cards from reports page")
