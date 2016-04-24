git checkout gh-pages
git merge master
sed -i s/localhost:8000/beothorn.github.io\\/WeightOut/g ./css/style.css
git add ./css/style.css
git commit -m"Publishing"
git push
git checkout master
