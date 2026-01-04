# GitHub Setup Guide

Follow these steps to push your DataGuard project to GitHub and share it with your friend.

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and log in
2. Click the **+** icon in the top right → **New repository**
3. Fill in the details:
   - **Repository name**: `pulse-data-ai` or `dataguard`
   - **Description**: "AI-powered DDoS Detection & Secure Dataset Analysis Portal"
   - **Public** or **Private** (choose based on your preference)
   - Do NOT initialize with README/gitignore (we already have them)
   - Click **Create repository**

## Step 2: Push to GitHub

Copy the commands from your GitHub repository page. It should look like this:

```bash
# Navigate to your project
cd c:\Users\ADMIN\OneDrive\Desktop\datagaurd\pulse-data-ai

# Add GitHub remote (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/pulse-data-ai.git

# Verify remote was added
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace** `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Share with Your Friend

Share the repository URL with your friend:
```
https://github.com/YOUR_USERNAME/pulse-data-ai
```

## For Your Friend: Clone the Repository

Your friend can clone the project with:

```bash
git clone https://github.com/YOUR_USERNAME/pulse-data-ai.git
cd pulse-data-ai
```

Then follow the Quick Start guide in [README.md](./README.md):

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Common GitHub Commands

### Pull latest changes
```bash
git pull origin main
```

### Create a new branch for features
```bash
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

### View commit history
```bash
git log --oneline
```

### Check current status
```bash
git status
```

## Additional Resources

- [GitHub CLI](https://cli.github.com/) - For command-line GitHub operations
- [GitHub Docs](https://docs.github.com) - Official GitHub documentation
- [Git Cheat Sheet](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf)

## Troubleshooting

### Already have a remote?
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/pulse-data-ai.git
```

### Push failed?
Make sure your local branch is up to date:
```bash
git pull origin main
git push origin main
```

### Forgot to add a file?
```bash
git add <filename>
git commit --amend --no-edit
git push -f origin main
```

---

You're all set! Your project is now on GitHub and ready to share. 🎉
