@echo off
git config user.email "saswatdutta1310@gmail.com"
git config user.name "Saswat Dutta"
git add .
git commit -m "feat(phase-1): foundation - real auth, RAG pipeline, Supabase backend, Apply and Track v1"
git remote add origin https://github.com/saswatdutta1310/Sahayak_gov.git
git branch -M main
git push -u origin main
