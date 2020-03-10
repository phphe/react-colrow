#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
typedoc --inputFiles src/lib-entry.ts --excludeNotExported --excludePrivate --out docs --ignoreCompilerErrors --gaID UA-155723570-4

# 进入生成的文件夹
cd docs
# custom domain
echo "react-colrow.phphe.com" > CNAME
echo "" > .nojekyll # check https://github.com/TypeStrong/typedoc/issues/620 but .nojekyll may be not required when use gh-pages branch

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:phphe/react-colrow.git master:gh-pages

# back
cd ..

# remove generated docs
rm docs -rf