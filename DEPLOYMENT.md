# Geo-Guardian Client - Production Deployment Guide

## ✅ Production Readiness Checklist

### Configuration
- [x] Backend URL configured to production (https://geo-guardian-backend.onrender.com)
- [x] Socket.IO connection to production backend
- [x] No hardcoded localhost references
- [x] HTTPS for all API calls

### Build & Performance
- [x] Build script configured (`npm run build`)
- [x] Vite production optimization enabled
- [x] Code splitting with vendor chunks (React, Leaflet, Socket.IO)
- [x] Source maps disabled for production
- [x] Build tested successfully ✓

### Assets & Branding
- [x] Custom favicon (Geo-Guardian.png)
- [x] Page title set to "Geo-Guardian"
- [x] Meta description added
- [x] Theme color configured

### Code Quality
- [x] No compilation errors
- [x] No console.log debug statements
- [x] Only console.error for production debugging
- [x] No exposed secrets or API keys

### Security
- [x] CORS handled by backend
- [x] HTTPS connections only
- [x] No sensitive data in client code

---

## 🚀 Deployment Instructions

### Option 1: Netlify (Recommended)

#### Via Drag & Drop
1. Build the project:
   ```bash
   cd client
   npm run build
   ```

2. Go to [Netlify](https://app.netlify.com/)

3. Drag the `dist` folder to Netlify's deployment area

4. Your site will be live at `https://[random-name].netlify.app`

#### Via Git Integration
1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Production ready client"
   git branch -M main
   git remote add origin https://github.com/yourusername/geo-guardian-client.git
   git push -u origin main
   ```

2. Go to [Netlify](https://app.netlify.com/)

3. Click "Add new site" → "Import an existing project"

4. Connect your GitHub repository

5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** `client` (if monorepo) or leave empty

6. Click "Deploy site"

#### Custom Domain (Optional)
- After deployment, go to Site settings → Domain management
- Add your custom domain
- Configure DNS settings as instructed

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd client
   vercel --prod
   ```

3. Follow the prompts

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Update `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### Option 4: Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase:
   ```bash
   firebase init hosting
   ```
   - Select `dist` as public directory
   - Configure as single-page app: Yes
   - Don't overwrite index.html

3. Deploy:
   ```bash
   npm run build
   firebase deploy
   ```

---

## 📊 Build Output

Successful build generates:
```
dist/
├── assets/
│   ├── index-[hash].js          (71.82 KB → 27.50 KB gzipped)
│   ├── index-[hash].css         (51.70 KB → 17.57 KB gzipped)
│   ├── react-vendor-[hash].js   (React & React DOM)
│   ├── leaflet-vendor-[hash].js (Maps & drawing tools)
│   ├── socket-vendor-[hash].js  (Socket.IO client)
│   └── spritesheet-[hash].svg   (Leaflet icons)
├── favicon.png
└── index.html
```

**Total Size:** ~481 KB (165 KB gzipped)

---

## 🔍 Post-Deployment Verification

### Test Checklist
1. **Map Loading**
   - [ ] Map tiles load correctly
   - [ ] Drawing tools work
   - [ ] Zoom controls functional

2. **Backend Connection**
   - [ ] Socket.IO connects to backend
   - [ ] Can create danger zones
   - [ ] Can delete danger zones
   - [ ] Zones persist after refresh

3. **Alerts**
   - [ ] Mobile alerts appear as toast notifications
   - [ ] Alert styling displays correctly

4. **Performance**
   - [ ] Page loads under 3 seconds
   - [ ] No console errors
   - [ ] Mobile responsive

5. **Branding**
   - [ ] Favicon appears in browser tab
   - [ ] Page title is "Geo-Guardian"

### Test Commands
```bash
# Check if backend is accessible
curl https://geo-guardian-backend.onrender.com/health

# Expected response:
# {"status":"active","database":"connected"}
```

---

## 🐛 Troubleshooting

### Map Not Loading
- **Issue:** Blank map area
- **Solution:** Check browser console for tile loading errors. Ensure internet connection.

### Backend Connection Failed
- **Issue:** "Cannot create zones" or "Socket.IO disconnected"
- **Solutions:**
  1. Verify backend is running: `https://geo-guardian-backend.onrender.com/health`
  2. Check browser console for CORS errors
  3. Ensure backend CORS includes your Netlify URL
  4. Update backend `.env` CORS whitelist if needed

### Build Errors
- **Issue:** Build fails with dependency errors
- **Solutions:**
  1. Delete `node_modules` and `package-lock.json`
  2. Run `npm install` again
  3. Run `npm run build`

### Favicon Not Showing
- **Issue:** Default Vite icon appears
- **Solution:** Hard refresh browser (Ctrl+Shift+R) to clear favicon cache

---

## 🔄 Update Backend CORS (If Needed)

After deploying to Netlify/Vercel, update the backend CORS whitelist:

1. Edit `server/.env` or Render environment variables:
   ```env
   ALLOWED_ORIGINS=https://your-site.netlify.app,http://localhost:5173
   ```

2. Or update `server/index.js`:
   ```javascript
   const allowedOrigins = [
     'https://your-site.netlify.app',  // Add your deployment URL
     'https://geo-guardian.netlify.app',
     'http://localhost:5173',
     'http://localhost:3000'
   ];
   ```

3. Redeploy backend if changed

---

## 📱 Mobile Testing

Test on real devices or emulators:
- Chrome DevTools Device Toolbar (F12)
- BrowserStack (cross-browser testing)
- Real devices via network

---

## 🎯 Performance Optimization

### Already Implemented
- ✅ Code splitting
- ✅ Vendor chunk separation
- ✅ CSS minification
- ✅ JS minification
- ✅ Asset optimization

### Future Optimizations (Optional)
- [ ] Add service worker for offline support
- [ ] Implement lazy loading for components
- [ ] Add image optimization
- [ ] Enable Brotli compression on hosting

---

## 📝 Monitoring & Analytics (Optional)

### Google Analytics
Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking (Sentry)
```bash
npm install @sentry/react
```

Add to `main.jsx`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

---

## ✅ Final Checklist

Before going live:
- [ ] Production build successful
- [ ] Backend URL updated
- [ ] SSL/HTTPS enabled
- [ ] Favicon visible
- [ ] Meta tags configured
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile devices
- [ ] Backend CORS updated with deployment URL
- [ ] Backend health check passes
- [ ] All features working
- [ ] No console errors
- [ ] Load time acceptable

---

## 🎉 You're Ready to Deploy!

Your client is production-ready! Choose a deployment platform above and follow the steps.

**Recommended:** Netlify (easiest with automatic HTTPS and CDN)

Need help? Check the troubleshooting section or the main project documentation.
