#!/bin/bash
# Run from your project root in Git Bash.
# Fixes all field name references to match actual DB columns:
#   apply_url  → applyUrl   (revert previous change)
#   posted_at  → postedat   (revert + fix casing)
#   postedAt   → postedat   (fix casing)

FILES=$(grep -rl --include="*.ts" --include="*.tsx" --include="*.js" \
  -e "apply_url\|posted_at\|postedAt" \
  --exclude-dir=node_modules \
  --exclude-dir=.next \
  .)

echo "Files to update:"
echo "$FILES"
echo ""

for f in $FILES; do
  # Revert apply_url → applyUrl
  sed -i \
    -e "s/job\.apply_url/job.applyUrl/g" \
    -e "s/formData\.apply_url/formData.applyUrl/g" \
    -e "s/'apply_url'/'applyUrl'/g" \
    -e "s/\"apply_url\"/\"applyUrl\"/g" \
    -e "s/apply_url:/applyUrl:/g" \
    -e "s/htmlFor=\"apply_url\"/htmlFor=\"applyUrl\"/g" \
    -e "s/id=\"apply_url\"/id=\"applyUrl\"/g" \
    -e "s/name=\"apply_url\"/name=\"applyUrl\"/g" \
    -e "s/formData\.get('apply_url')/formData.get('applyUrl')/g" \
    "$f"

  # Fix postedAt → postedat (DB column is all lowercase)
  sed -i \
    -e "s/job\.postedAt/job.postedat/g" \
    -e "s/job\.posted_at/job.postedat/g" \
    -e "s/posted_at:/postedat:/g" \
    -e "s/postedAt:/postedat:/g" \
    -e "s/'postedAt'/'postedat'/g" \
    -e "s/'posted_at'/'postedat'/g" \
    -e "s/\"postedAt\"/\"postedat\"/g" \
    -e "s/\"posted_at\"/\"postedat\"/g" \
    "$f"

  echo "Updated: $f"
done

echo ""
echo "Done. Run: npm run build"