@echo off
REM Accept our (local Phase 1) version for every conflicted file
git checkout --ours .
git add .
git commit -m "chore: resolve merge conflicts - keep Phase 1 implementation over original prototype"
git push -u origin main
