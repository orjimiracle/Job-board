#!/bin/bash
# Run this from your project root.
# Renames all applyUrl → apply_url and postedAt → posted_at
# across all .ts, .tsx, .js files (excluding node_modules and .next)

FILES=$(grep -rl --include="*.ts" --include="*.tsx" --include="*.js" \
  -e "applyUrl\|postedAt" \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  .)

echo "Files to update:"
echo "$FILES"
echo ""

for f in $FILES; do
  # applyUrl → apply_url (field access, object keys, form names, HTML ids)
  sed -i \
    -e "s/job\.applyUrl/job.apply_url/g" \
    -e "s/formData\.applyUrl/formData.apply_url/g" \
    -e "s/'applyUrl'/'apply_url'/g" \
    -e "s/\"applyUrl\"/\"apply_url\"/g" \
    -e "s/applyUrl:/apply_url:/g" \
    -e "s/htmlFor=\"applyUrl\"/htmlFor=\"apply_url\"/g" \
    -e "s/id=\"applyUrl\"/id=\"apply_url\"/g" \
    -e "s/name=\"applyUrl\"/name=\"apply_url\"/g" \
    -e "s/formData\.get('applyUrl')/formData.get('apply_url')/g" \
    "$f"

  # postedAt → posted_at
  sed -i \
    -e "s/job\.postedAt/job.posted_at/g" \
    -e "s/postedAt:/posted_at:/g" \
    -e "s/'postedAt'/'posted_at'/g" \
    -e "s/\"postedAt\"/\"posted_at\"/g" \
    "$f"

  echo "Updated: $f"
done

echo ""
echo "Done. Run: npm run build"