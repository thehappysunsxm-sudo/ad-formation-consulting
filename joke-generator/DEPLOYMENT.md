# Deployment Guide

## Local Development

### Option 1: Direct Browser
```bash
# Simply open index.html in your browser
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

### Option 2: Python Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Access: http://localhost:8000
```

### Option 3: Node.js Server
```bash
# Install http-server globally
npm install -g http-server

# Run
http-server

# Access: http://localhost:8080
```

### Option 4: Live Server (VS Code)
1. Install "Live Server" extension
2. Right-click `index.html`
3. Click "Open with Live Server"
4. Opens in browser automatically

## GitHub Pages Deployment

### Setup
1. Create GitHub repository
2. Enable GitHub Pages in settings
3. Set source to main/master branch
4. Upload files

### URL Structure
```
https://username.github.io/joke-generator
```

### Steps
```bash
# Navigate to repo
cd joke-generator

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote
git remote add origin https://github.com/username/joke-generator.git

# Push to main
git branch -M main
git push -u origin main
```

## Netlify Deployment

### Method 1: Git Integration
1. Connect GitHub repository
2. Build settings: Leave empty (static site)
3. Publish directory: Root folder
4. Deploy

### Method 2: Drag & Drop
1. Go to Netlify.com
2. Drag entire folder
3. Site deployed automatically

### Method 3: CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

## Vercel Deployment

### Setup
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Firebase Hosting

### Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

## AWS S3 + CloudFront

### Create S3 Bucket
1. Create S3 bucket
2. Enable static website hosting
3. Upload files
4. Set bucket policy for public access

### CloudFront Distribution
1. Create CloudFront distribution
2. Set origin to S3 bucket
3. Enable HTTPS
4. Set default root object to `index.html`

### CLI Method
```bash
# Create bucket
aws s3 mb s3://my-joke-generator

# Upload files
aws s3 sync . s3://my-joke-generator

# Make public
aws s3api put-bucket-acl --bucket my-joke-generator --acl public-read
```

## Docker Deployment

### Dockerfile
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
```

### Build & Run
```bash
# Build image
docker build -t joke-generator .

# Run container
docker run -p 8000:80 joke-generator

# Access: http://localhost:8000
```

## Docker Compose

```yaml
version: '3'
services:
  web:
    image: nginx:alpine
    ports:
      - "8000:80"
    volumes:
      - ./:/usr/share/nginx/html
```

```bash
docker-compose up
```

## Environment Configuration

No environment variables needed! The app works with default public APIs.

## HTTPS Setup

### Let's Encrypt (Free)
```bash
# Using Certbot
certbot certonly --standalone -d yourdomain.com
```

### GitHub Pages
HTTPS automatic with custom domain

### Netlify
Automatic HTTPS with free SSL certificate

## Performance Optimization

### Caching Headers
```
Cache-Control: max-age=3600
Content-Encoding: gzip
```

### Minification
```bash
# Optional: Minify CSS/JS
npm install -g minify
minify script.js > script.min.js
```

### CDN
- Netlify CDN (automatic)
- Cloudflare (free tier)
- AWS CloudFront

## Monitoring

### Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- Statuscake

### Analytics
- Google Analytics
- Netlify Analytics
- Cloudflare Analytics

## Domain Setup

### Point Domain to Service

**Netlify:**
```
NAME: www
TYPE: CNAME
VALUE: yourdomain.netlify.app
```

**GitHub Pages:**
```
NAME: @
TYPE: A
VALUE: 185.199.108.153
```

**Vercel:**
```
NAME: @
TYPE: A
VALUE: 76.76.19.165
```

## Troubleshooting

### 404 Error
- Check file paths
- Ensure index.html exists
- Verify serve settings

### APIs Not Working
- Check CORS configuration
- Verify API endpoints
- Check console errors

### Slow Loading
- Enable caching
- Use CDN
- Minify assets
- Compress images

## Rollback

### GitHub Pages
```bash
git log
git checkout <commit-hash>
git push -f origin main
```

### Netlify
Automatic rollback in Netlify dashboard

## Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers set
- [ ] Input validation working
- [ ] XSS prevention active
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] No sensitive data exposed
- [ ] Privacy policy added

## Recommended Setup

**Best for beginners:**
- GitHub + GitHub Pages = Free, simple

**Best for production:**
- Netlify or Vercel = Modern, fast, secure

**Best for scale:**
- AWS S3 + CloudFront = Reliable, scalable

---

**Happy deploying! 🚀**
