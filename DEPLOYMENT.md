# 🚀 Deployment Guide

## GitHub Pages Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `portfolio` (or any name you prefer)
3. Don't initialize with README, .gitignore, or license

### Step 2: Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Portfolio website"

# Add remote (replace 'yourusername' with your GitHub username)
git remote add origin https://github.com/yourusername/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Your site will automatically deploy on every push to `main`

### Step 4: Update Configuration

Before deploying, update these files:

1. **`next.config.ts`** - Update basePath if needed:
   ```typescript
   basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
   ```

2. **`app/layout.tsx`** - Update metadata:
   - Change `url` in openGraph to your GitHub Pages URL
   - Update your name, description, and social links

3. **All components** - Update personal information:
   - Your name, email, phone, location
   - Social media links (GitHub, LinkedIn, Twitter)
   - Projects, experience, skills

### Step 5: Verify Deployment

After pushing to GitHub:

1. Go to your repository
2. Click on **Actions** tab
3. Wait for the deployment workflow to complete (usually 2-3 minutes)
4. Your site will be live at: `https://yourusername.github.io/portfolio`

## Troubleshooting

### Issue: 404 on GitHub Pages

**Solution:** Make sure the `.nojekyll` file exists in the `public` folder.

### Issue: Styles not loading

**Solution:** Check that `basePath` in `next.config.ts` matches your repository name.

### Issue: Deployment workflow fails

**Solutions:**
- Make sure GitHub Pages is enabled in repository settings
- Check that the workflow file is at `.github/workflows/deploy.yml`
- Verify that Pages deployment is set to "GitHub Actions"

## Custom Domain (Optional)

To use a custom domain:

1. Go to repository **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Add a CNAME record in your DNS settings pointing to `yourusername.github.io`
4. Wait for DNS propagation (can take up to 24 hours)
5. Enable **Enforce HTTPS** in GitHub Pages settings

## Local Testing

Test your production build locally:

```bash
# Build the project
npm run build

# Serve the static files (install serve if needed)
npx serve out
```

## Updating Your Portfolio

To update your portfolio:

```bash
# Make your changes
# Stage changes
git add .

# Commit
git commit -m "Update portfolio content"

# Push to GitHub
git push

# Deployment happens automatically!
```

## Need Help?

- Check the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- Review [GitHub Pages documentation](https://docs.github.com/en/pages)
- Open an issue if you encounter problems

---

**Happy deploying! 🎉**
