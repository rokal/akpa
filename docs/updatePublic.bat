echo "Deleting old publication"

rmdir public /S /Q
md public
git worktree prune
del /F .git/worktrees/public/

echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages public origin/gh-pages

echo "Removing existing files"
del /F /Q public\*.*

echo "Generating site"
hugo --theme=hugo-universal-theme

echo "Updating gh-pages branch"
cd public && git add --all && git commit -m "Publishing to gh-pages (publish.sh)"
cd ..
