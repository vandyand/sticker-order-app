import os
import random

# Directory to save SVG files
output_dir = '.'

# Make the directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Function to generate a unique SVG shape
def generate_svg_content(index):
    shapes = ['circle', 'rectangle', 'polygon']
    shape = random.choice(shapes)

    if shape == 'circle':
        cx = random.randint(10, 90)
        cy = random.randint(10, 90)
        r = random.randint(5, 20)
        color = f'#{random.randint(0, 0xFFFFFF):06x}'
        return f'<svg width="100" height="100"><circle cx="{cx}" cy="{cy}" r="{r}" fill="{color}" /></svg>'
    elif shape == 'rectangle':
        x = random.randint(10, 70)
        y = random.randint(10, 70)
        width = random.randint(10, 30)
        height = random.randint(10, 30)
        color = f'#{random.randint(0, 0xFFFFFF):06x}'
        return f'<svg width="100" height="100"><rect x="{x}" y="{y}" width="{width}" height="{height}" fill="{color}"/></svg>'
    elif shape == 'polygon':
        points = " ".join(f"{random.randint(0, 100)},{random.randint(0, 100)}" for _ in range(3))
        color = f'#{random.randint(0, 0xFFFFFF):06x}'
        return f'<svg width="100" height="100"><polygon points="{points}" fill="{color}" /></svg>'

# Generate and save 7 unique SVG files
for i in range(7):
    svg_content = generate_svg_content(i)
    file_path = os.path.join(output_dir, f'svg_{i}.svg')
    with open(file_path, 'w') as svg_file:
        svg_file.write(svg_content)