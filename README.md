# Community AI Project - Netlify Deployment

## Project Structure

```
community-ai-project/
├── index.html          # Main website
├── style.css           # Styles
├── projects.js         # Project data
├── config.js.template  # Template for local dev (rename to config.js)
├── 404.html            # Error page
├── netlify.toml        # Netlify configuration
├── .gitignore          # Excludes config.js from git
└── netlify/
    └── functions/
        └── gemini.js   # Serverless API proxy
```

## Local Development

1. **Copy the template config:**
   ```bash
   cp config.js.template config.js
   ```

2. **Add your Gemini API key** to `config.js`:
   ```javascript
   window.CONFIG = {
       API_KEY: "your-actual-api-key-here"
   };
   ```

3. **Run a local server:**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node
   npx serve .
   
   # Using Netlify CLI (recommended - tests functions too)
   npx netlify dev
   ```

4. Open `http://localhost:8000` (or the port shown)

## Netlify Deployment

### Step 1: Push to GitHub

1. Create a new GitHub repository
2. Push your code (config.js will be excluded by .gitignore):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

### Step 2: Connect to Netlify

1. Go to [netlify.com](https://app.netlify.com) and log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **GitHub** and authorize if needed
4. Choose your repository
5. Deploy settings will auto-detect from `netlify.toml`:
   - Build command: (leave empty)
   - Publish directory: `.`
6. Click **"Deploy"**

### Step 3: Add Environment Variable (CRITICAL!)

1. In Netlify, go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your actual Gemini API key
4. Click **"Save"**
5. **Redeploy:** Go to **Deploys** tab → **Trigger deploy** → **Deploy site**

## Troubleshooting

### "Server configuration error" / API not working

- Make sure `GEMINI_API_KEY` is set in Netlify environment variables
- Redeploy after adding the environment variable

### Works locally but not in production

- Check browser console for errors (F12 → Console)
- Verify the serverless function is deployed: visit `yoursite.netlify.app/.netlify/functions/gemini` (should show "Method Not Allowed" - this confirms it's deployed)

### CORS errors

- The function includes CORS headers. If issues persist, check Netlify function logs in the dashboard.

## Security Notes

- **NEVER** commit `config.js` with your real API key
- The `.gitignore` and `netlify.toml` redirect protect against accidental exposure
- Your API key is only stored in Netlify's secure environment variables
