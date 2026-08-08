#!/usr/bin/env python3
"""Splice the fonts and the app sources into one self-contained ../index.html."""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
SOURCES = ['app-core.js', 'app-scenes-a.js', 'app-scenes-b.js',
           'app-scenes-c.js', 'app-scenes-d.js', 'app-player.js']

def read(name):
    with open(os.path.join(BASE, name), encoding='utf-8') as fh:
        return fh.read()

page = read('shell.html').replace('/*FONTS*/', read('fonts.css')) \
                         .replace('/*APP*/', '\n'.join(read(f) for f in SOURCES))
dest = os.path.join(BASE, '..', 'index.html')
with open(dest, 'w', encoding='utf-8') as fh:
    fh.write(page)
print('built %s (%d KB)' % (os.path.normpath(dest), round(len(page) / 1024)))
