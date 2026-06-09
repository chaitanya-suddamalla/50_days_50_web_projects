import pathlib

root = pathlib.Path(__file__).resolve().parent.parent
replacements = [
    ('50 Days 50 Web Projects', '50 Days 50 Web Projects'),
    ('50 Days 50 Projects', '50 Days 50 Projects'),
    ('50-days-50-web-project.vercel.app', '50-days-50-web-project.vercel.app'),
    ('50-days-50-web-projects', '50-days-50-web-projects'),
    ('50-days-50-web-project', '50-days-50-web-project'),
    ('50-days-50-web-projects', '50-days-50-web-projects'),
]
file_exts = {'.html', '.md', '.js', '.json', '.py', '.yml', '.yaml', '.css', '.txt'}
changed = []
for path in sorted(root.rglob('*')):
    if not path.is_file():
        continue
    if path.suffix.lower() not in file_exts:
        continue
    if path.name.endswith('.bak'):
        continue
    try:
        text = path.read_text(encoding='utf-8')
    except Exception:
        continue
    new_text = text
    for old, new in replacements:
        new_text = new_text.replace(old, new)
    if new_text != text:
        path.write_text(new_text, encoding='utf-8')
        changed.append(path.relative_to(root))
print(f'updated files: {len(changed)}')
for f in changed:
    print(f)
