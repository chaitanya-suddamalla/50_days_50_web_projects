#!/usr/bin/env python3
import os

ROOT = os.path.join(os.path.dirname(__file__), '..', 'public')

def find_first_html(dirpath):
    for entry in os.listdir(dirpath):
        if entry.lower().endswith('.html'):
            return entry
    return None

def main():
    created = []
    skipped = []
    for name in os.listdir(ROOT):
        path = os.path.join(ROOT, name)
        if not os.path.isdir(path):
            continue
        index_path = os.path.join(path, 'index.html')
        if os.path.exists(index_path):
            skipped.append(name)
            continue
        first_html = find_first_html(path)
        if not first_html:
            skipped.append(name)
            continue
        # create a small redirect index.html
        content = f'''<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url={first_html}" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Redirecting</title>
  </head>
  <body>
    <p>If you are not redirected automatically, <a href="{first_html}">click here</a>.</p>
  </body>
</html>
'''
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(content)
        created.append((name, first_html))

    print('Created index.html for', len(created), 'folders')
    for c in created:
        print('  ', c[0], '->', c[1])
    print('Skipped', len(skipped), 'folders')

if __name__ == '__main__':
    main()
