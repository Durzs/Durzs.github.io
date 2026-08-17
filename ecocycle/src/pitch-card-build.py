#!/usr/bin/env python3
"""Inline the fonts into pitch-card.html and print the file to render."""
import os
BASE = os.path.dirname(os.path.abspath(__file__))
html = open(os.path.join(BASE, 'pitch-card.html'), encoding='utf-8').read()
fonts = open(os.path.join(BASE, 'fonts.css'), encoding='utf-8').read()
out = os.path.join(BASE, 'pitch-card.built.html')
open(out, 'w', encoding='utf-8').write(html.replace('/*FONTS*/', fonts))
print('built %s — open it in Chrome and Print to PDF (A4, background graphics on)' % out)
