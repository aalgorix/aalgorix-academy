p = "frontend/app/blog/[slug]/page.tsx"
with open(p, encoding="utf-8") as f:
    c = f.read()
c = c.replace("<motion", "<motion").replace("</motion>", "</motion>")
