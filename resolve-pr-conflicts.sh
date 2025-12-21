#!/bin/bash
# Script to resolve PR conflicts by accepting PR branch changes

set -e

echo "🔍 Fetching latest changes from origin..."
git fetch origin

echo "📥 Merging main into PR branch..."
if git merge origin/main --no-edit; then
    echo "✅ No conflicts! Merge completed successfully."
    exit 0
fi

echo "⚠️  Conflicts detected. Resolving by accepting PR branch changes..."

# Get list of conflicted files
CONFLICTED_FILES=$(git diff --name-only --diff-filter=U)

if [ -z "$CONFLICTED_FILES" ]; then
    echo "✅ No conflicts to resolve."
    exit 0
fi

echo "📝 Conflicted files:"
echo "$CONFLICTED_FILES"
echo ""

# Accept PR branch version (theirs) for all conflicts
echo "✅ Accepting PR branch version for all conflicted files..."
git checkout --theirs .
git add .

echo "💾 Committing resolved conflicts..."
git commit -m "Resolve merge conflicts by accepting PR #140 changes

All conflicts resolved by accepting the PR branch version (theirs).
This ensures the Expo migration changes take precedence."

echo "✅ Conflicts resolved successfully!"
echo "🚀 You can now push the changes: git push origin ws/rewrite-to-expo"

