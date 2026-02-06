# 📝 Git Workflow & Commit Guide

Complete guide for professional Git practices in your e-commerce catalog project.

---

## 🌲 Branch Strategy

### Main Branches
- `main` - Production-ready code (always deployable)
- `develop` - Integration branch for features (optional for solo project)

### Feature Branches
Create a new branch for each feature:

```bash
# Format: feature/feature-name
git checkout -b feature/product-card
git checkout -b feature/filtering-system
git checkout -b feature/pagination
git checkout -b fix/mobile-responsive
```

### Workflow
```bash
# 1. Create feature branch
git checkout -b feature/product-filtering

# 2. Make changes and commit
git add .
git commit -m "feat: add category filtering functionality"

# 3. Push to remote
git push origin feature/product-filtering

# 4. Merge to main when complete
git checkout main
git merge feature/product-filtering

# 5. Delete feature branch (optional)
git branch -d feature/product-filtering
```

---

## 💬 Conventional Commits

### Format
```
<type>(<scope>): <subject>

<body> (optional)

<footer> (optional)
```

### Types
| Type | Description | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add product search functionality` |
| `fix` | Bug fix | `fix: resolve pagination offset calculation` |
| `docs` | Documentation | `docs: update README with setup instructions` |
| `style` | Code style/formatting | `style: format code with Prettier` |
| `refactor` | Code refactoring | `refactor: extract filter logic to custom hook` |
| `perf` | Performance improvement | `perf: implement lazy loading for images` |
| `test` | Adding tests | `test: add unit tests for ProductCard` |
| `build` | Build system changes | `build: update Vite config for production` |
| `ci` | CI/CD changes | `ci: add GitHub Actions workflow` |
| `chore` | Maintenance tasks | `chore: update dependencies` |

### Scope (Optional)
Specify what part of the codebase:
- `products` - Product-related features
- `filters` - Filtering functionality
- `ui` - UI components
- `api` - API integration
- `types` - TypeScript types

### Subject Rules
- Use imperative mood ("add" not "added")
- Don't capitalize first letter
- No period at the end
- Keep under 50 characters

---

## 📋 Commit Examples for This Project

### Project Setup Phase
```bash
git commit -m "feat: initialize project with Vite and TypeScript"
git commit -m "feat: configure Tailwind CSS"
git commit -m "feat: set up Redux store and RTK Query"
git commit -m "chore: add ESLint and Prettier configuration"
git commit -m "docs: create initial README with project overview"
```

### API Integration Phase
```bash
git commit -m "feat(api): integrate Fake Store API for products"
git commit -m "feat(api): create productsAPI with RTK Query"
git commit -m "feat(types): define Product and Filter interfaces"
git commit -m "feat(api): add error handling for API requests"
```

### Component Development Phase
```bash
git commit -m "feat(products): create ProductCard component"
git commit -m "feat(products): implement ProductList with grid layout"
git commit -m "feat(ui): add loading skeleton for products"
git commit -m "style(products): enhance ProductCard hover effects"
git commit -m "feat(layout): create responsive Header component"
git commit -m "feat(layout): implement Footer with links"
```

### Feature Implementation Phase
```bash
git commit -m "feat(filters): add category filtering functionality"
git commit -m "feat(filters): implement price range filter"
git commit -m "feat(filters): create FilterSidebar component"
git commit -m "feat(products): add sort by price functionality"
git commit -m "feat(products): implement product search"
git commit -m "feat(products): add pagination component"
# OR
git commit -m "feat(products): implement infinite scroll loading"
```

### Bug Fixes
```bash
git commit -m "fix(filters): correct category filter reset logic"
git commit -m "fix(pagination): resolve page number calculation error"
git commit -m "fix(mobile): fix responsive layout on small screens"
git commit -m "fix(products): handle empty product list state"
git commit -m "fix(api): add retry logic for failed requests"
```

### Styling & UI Improvements
```bash
git commit -m "style(products): improve product card visual design"
git commit -m "style(global): update color scheme to brand colors"
git commit -m "style(filters): enhance filter sidebar layout"
git commit -m "perf(images): add lazy loading for product images"
git commit -m "feat(ui): add smooth scroll behavior"
```

### Testing & Quality
```bash
git commit -m "test(products): add unit tests for ProductCard"
git commit -m "test(filters): add tests for filter logic"
git commit -m "refactor(products): extract useProducts custom hook"
git commit -m "refactor(filters): simplify filter state management"
git commit -m "perf(products): optimize product list rendering"
```

### Documentation
```bash
git commit -m "docs: add component documentation"
git commit -m "docs: update README with feature descriptions"
git commit -m "docs: add API integration guide"
git commit -m "docs: create contributing guidelines"
```

### Deployment
```bash
git commit -m "build: configure Vercel deployment settings"
git commit -m "build: optimize production build"
git commit -m "chore: update environment variables for production"
git commit -m "docs: add live demo link to README"
```

### Final Touches
```bash
git commit -m "feat(a11y): add ARIA labels for accessibility"
git commit -m "feat(a11y): implement keyboard navigation"
git commit -m "perf: enable code splitting for routes"
git commit -m "style: apply final design polish"
git commit -m "docs: complete README documentation"
```

---

## 🔄 Daily Workflow

### Morning (Start of Day)
```bash
# Pull latest changes
git pull origin main

# Create feature branch
git checkout -b feature/todays-work

# Verify clean working directory
git status
```

### During Development
```bash
# Check what changed
git status
git diff

# Stage specific files
git add src/components/ProductCard.tsx
git add src/features/products/productsSlice.ts

# Or stage all changes
git add .

# Commit with meaningful message
git commit -m "feat(products): add ProductCard component with hover effects"

# Push to remote frequently
git push origin feature/todays-work
```

### End of Day
```bash
# Final commit
git add .
git commit -m "chore: end of day commit - [feature/status]"

# Push to remote
git push origin feature/todays-work

# Merge to main if feature complete
git checkout main
git merge feature/todays-work
git push origin main
```

---

## 📊 Commit Frequency Guidelines

### Good Commit Frequency
- **After completing a component**: ✅
- **After fixing a bug**: ✅
- **After adding a feature**: ✅
- **Before switching tasks**: ✅
- **End of work session**: ✅

### Too Frequent (Avoid)
- After every line of code ❌
- After minor typo fixes ❌
- Every 5 minutes ❌

### Too Infrequent (Avoid)
- Only once per day ❌
- Only when feature is perfect ❌
- Only at project end ❌

### Ideal Pattern
```
Day 1:
✓ 9:00 AM - Initial setup commit
✓ 10:30 AM - API integration complete
✓ 12:00 PM - ProductCard component done
✓ 2:30 PM - ProductList implemented
✓ 4:00 PM - Basic styling added
✓ 5:30 PM - End of day commit

Total: 6 commits (good pace!)
```

---

## 🎯 Commit Message Quality

### ❌ Bad Examples
```bash
git commit -m "updates"
git commit -m "fix"
git commit -m "changes"
git commit -m "wip"
git commit -m "asdf"
git commit -m "finished"
```

### ✅ Good Examples
```bash
git commit -m "feat: add product filtering by category"
git commit -m "fix: resolve pagination display bug on mobile"
git commit -m "docs: update README with deployment instructions"
git commit -m "refactor: extract filter logic to custom hook"
git commit -m "style: improve ProductCard responsive layout"
```

### ⭐ Excellent Examples (with body)
```bash
git commit -m "feat: implement infinite scroll for product list

- Add IntersectionObserver for scroll detection
- Fetch next page when user reaches bottom
- Show loading indicator during fetch
- Handle edge cases (no more products, errors)

Closes #15"
```

---

## 🔍 Viewing Your Git History

### View commit log
```bash
# Simple log
git log --oneline

# Detailed log
git log

# Pretty formatted log
git log --graph --oneline --decorate --all

# Last 5 commits
git log -5

# Commits by author
git log --author="Your Name"
```

### Review changes
```bash
# See what changed in last commit
git show

# Compare with previous version
git diff HEAD~1

# See file history
git log --follow src/components/ProductCard.tsx
```

---

## 🚨 Common Git Issues & Solutions

### Issue: Committed to wrong branch
```bash
# Move last commit to new branch
git branch new-branch-name
git reset --hard HEAD~1
git checkout new-branch-name
```

### Issue: Want to undo last commit (but keep changes)
```bash
git reset --soft HEAD~1
```

### Issue: Want to undo last commit (discard changes)
```bash
git reset --hard HEAD~1
# WARNING: This deletes your changes!
```

### Issue: Made changes but forgot to create branch
```bash
# Stash changes
git stash

# Create and switch to new branch
git checkout -b feature/new-feature

# Apply stashed changes
git stash pop
```

### Issue: Merge conflicts
```bash
# See conflicted files
git status

# Open files, look for:
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name

# Edit files to resolve conflicts
# Then:
git add .
git commit -m "fix: resolve merge conflicts"
```

### Issue: Want to change last commit message
```bash
git commit --amend -m "feat: corrected commit message"
```

---

## 📈 Git Best Practices for Project Nexus

### 1. Commit Often, Push Often
- Commit every 30-60 minutes of work
- Push to GitHub at least 2-3 times per day
- Don't wait until everything is perfect

### 2. Write Meaningful Messages
- Future you should understand what changed
- Mentors reviewing should see your thought process
- Employers looking at GitHub should be impressed

### 3. Keep Commits Atomic
- One commit = one logical change
- Don't mix unrelated changes
- Makes debugging easier later

### 4. Use Branches for Major Features
- `feature/infinite-scroll`
- `feature/product-filtering`
- `fix/mobile-layout`

### 5. Review Before Committing
```bash
# Always check what you're committing
git status
git diff

# Then commit
git add .
git commit -m "descriptive message"
```

---

## 🎓 Git Workflow for Project Nexus

### Phase 1: Setup (Day 1)
```bash
feat: initialize project with Vite and React
feat: configure TypeScript and ESLint
feat: set up Tailwind CSS
feat: configure Redux Toolkit
docs: create initial README
```

### Phase 2: Core Development (Day 1-2)
```bash
feat(api): integrate product API
feat(products): create ProductCard component
feat(products): implement ProductList
feat(filters): add filtering functionality
feat(products): implement sorting
feat(products): add pagination/infinite scroll
```

### Phase 3: Enhancement (Day 2)
```bash
style: enhance UI with Tailwind
feat(a11y): add accessibility features
perf: optimize image loading
feat: implement search functionality
```

### Phase 4: Polish (Day 3)
```bash
fix: resolve responsive layout issues
test: add component tests
docs: update README with all features
build: configure production build
docs: add demo links and screenshots
```

---

## 🏆 Scoring Points with Git (15 points available)

### Git Mastery (5 pts)
✅ Use feature branches
✅ Meaningful branch names
✅ Clean merge history
✅ No merge conflicts in main
✅ Regular commits

### Commit Messages (5 pts)
✅ Follow conventional commits
✅ Clear, descriptive subjects
✅ Explain "why" not just "what"
✅ Consistent format
✅ Proper grammar

### Version Control Practices (5 pts)
✅ Frequent commits (15+ over project)
✅ Logical commit grouping
✅ No "WIP" or "test" commits
✅ Clean `.gitignore`
✅ Organized repository structure

---

## 📚 Git Cheat Sheet

```bash
# Basic Commands
git status              # Check status
git add .              # Stage all changes
git commit -m "msg"    # Commit with message
git push               # Push to remote
git pull               # Pull from remote

# Branching
git branch             # List branches
git checkout -b name   # Create and switch
git merge branch-name  # Merge branch
git branch -d name     # Delete branch

# History
git log                # View commits
git log --oneline      # Compact view
git diff               # See changes

# Undoing
git reset --soft HEAD~1  # Undo commit, keep changes
git reset --hard HEAD~1  # Undo commit, lose changes
git checkout -- file     # Discard file changes

# Remote
git remote -v          # View remotes
git push origin main   # Push to main
git pull origin main   # Pull from main
```

---

## ✅ Git Checklist for Submission

Before submitting Project Nexus:

- [ ] Repository is public on GitHub
- [ ] README.md is complete and professional
- [ ] All code is pushed to main branch
- [ ] Commit history shows consistent work
- [ ] Commit messages follow conventions
- [ ] No sensitive data in commits (.env files)
- [ ] .gitignore is properly configured
- [ ] Branch structure is clean
- [ ] No merge conflicts
- [ ] Repository name is professional
- [ ] Description and tags added to repo
- [ ] Link works and is accessible

---

## 🎯 Final Git Tips

1. **Commit early, commit often** - Don't wait for perfection
2. **Write for humans** - Your commit messages tell a story
3. **Stay organized** - Clean branches, clear structure
4. **Push regularly** - Don't lose work to computer issues
5. **Review before pushing** - Check what you're sharing

Remember: Your Git history is part of your portfolio. Make it professional! 🚀

---

**Pro Tip**: Set up commit message template
```bash
git config --global commit.template ~/.gitmessage.txt
```

Then create `~/.gitmessage.txt`:
```
# Type: Subject (50 chars max)

# Body: Explain what and why (72 chars per line)

# Footer: Issue references, breaking changes
```

Good luck! Your Git game will impress! 💪
