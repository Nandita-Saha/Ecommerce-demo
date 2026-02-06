# 🚀 Railway Deployment Quick Checklist

Use this checklist before deploying to Railway.

## ✅ Pre-Deployment Checklist

### 1. Code Preparation
- [ ] All code changes committed
- [ ] `.env` is in `.gitignore` ✅
- [ ] `.env.example` exists with template
- [ ] Code pushed to GitHub `main` branch
- [ ] No sensitive data in code (API keys, passwords, etc.)

### 2. MongoDB Atlas Setup
- [ ] MongoDB Atlas account created
- [ ] Free tier cluster created (M0)
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0 allowed)
- [ ] Connection string copied and saved
- [ ] Database name added to connection string

**Your MongoDB connection string should look like:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

### 3. Environment Variables Ready
- [ ] Production `MONGO_URI` (from MongoDB Atlas)
- [ ] Production `JWT_SECRET` (generate new one!)
- [ ] `NODE_ENV=production`
- [ ] `PORT=5000` (or let Railway assign)

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Railway Account Setup
- [ ] Railway account created (https://railway.app)
- [ ] GitHub connected to Railway
- [ ] Payment method added (for free trial credits)

## 🚂 Railway Deployment Steps

### Step 1: Create New Project
1. [ ] Go to Railway dashboard
2. [ ] Click "New Project"
3. [ ] Select "Deploy from GitHub repo"
4. [ ] Choose your repository
5. [ ] Railway auto-detects your app

### Step 2: Configure Environment Variables
1. [ ] Click on your project
2. [ ] Go to "Variables" tab
3. [ ] Add all environment variables:
   ```
   NODE_ENV=production
   MONGO_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<your-generated-secret>
   PORT=5000
   ```
4. [ ] Save variables

### Step 3: Configure Build Settings
1. [ ] Go to "Settings" tab
2. [ ] Verify:
   - **Build Command**: (empty - auto-detected)
   - **Start Command**: `npm start`
3. [ ] Save if changed

### Step 4: Deploy
1. [ ] Railway automatically starts deploying
2. [ ] Wait for build to complete (~2-5 minutes)
3. [ ] Check deployment logs for errors
4. [ ] Once successful, Railway provides a URL

### Step 5: Get Your App URL
1. [ ] Click "Settings" tab
2. [ ] Under "Domains", click "Generate Domain"
3. [ ] Your app URL: `https://your-app-name.up.railway.app`
4. [ ] Copy this URL

## 🧪 Post-Deployment Testing

### Test Backend API
```bash
# Replace with your Railway URL
curl https://your-app-name.up.railway.app/api/health

# Should return:
# {"status":"OK","environment":"production","timestamp":"..."}
```

### Test Frontend
1. [ ] Visit your Railway URL in browser
2. [ ] Homepage loads correctly
3. [ ] Can browse products
4. [ ] Can add items to cart

### Test Authentication
1. [ ] Click login/signup
2. [ ] Create a new account
3. [ ] Verify registration works
4. [ ] Login with new account
5. [ ] Check if user name appears in navbar
6. [ ] Try accessing protected routes (checkout, profile)
7. [ ] Logout works correctly

### Verify Database
1. [ ] Go to MongoDB Atlas dashboard
2. [ ] Click "Collections"
3. [ ] Check `ecommerce` database
4. [ ] Verify `users` collection has your test user
5. [ ] Password should be hashed

## 🔄 Enable Auto-Deploy

Auto-deploy is enabled by default! Verify:

1. [ ] Go to Railway project → Settings
2. [ ] Under "Source", check:
   - Branch: `main` ✅
   - Auto-deploy: Enabled ✅

**Now every push to `main` branch will auto-deploy!**

## 📝 Update Your Code for Production

### If you need to make changes:

```bash
# Make your changes locally
# Test locally first!

# Commit and push
git add .
git commit -m "Your commit message"
git push origin main

# Railway will automatically:
# 1. Detect the push
# 2. Build your app
# 3. Deploy the new version
# 4. Zero downtime!
```

## 🐛 Troubleshooting

### Build Failed
- [ ] Check Railway logs (Deployments → Click deployment → Logs)
- [ ] Verify all dependencies in `package.json`
- [ ] Check Node.js version compatibility

### App Crashes
- [ ] Check environment variables are set correctly
- [ ] Verify MongoDB connection string
- [ ] Check Railway logs for error messages

### Database Connection Error
- [ ] MongoDB Atlas network access allows 0.0.0.0/0
- [ ] Connection string is correct
- [ ] Database user has correct permissions
- [ ] Password doesn't have special characters (or URL encode)

### Authentication Not Working
- [ ] JWT_SECRET is set in Railway
- [ ] Frontend is making requests to correct URL
- [ ] CORS is configured correctly

### Can't Access App
- [ ] Domain is generated in Railway settings
- [ ] Deployment is successful (check status)
- [ ] No errors in logs

## 📊 Monitor Your App

### Railway Dashboard
- [ ] Check "Metrics" tab for usage
- [ ] Monitor "Deployments" for history
- [ ] Review "Logs" for errors

### MongoDB Atlas
- [ ] Check "Metrics" for database performance
- [ ] Monitor "Collections" for data
- [ ] Review "Performance Advisor" for optimization

## 💰 Cost Monitoring

### Railway Free Trial
- [ ] $5 credit per month
- [ ] Monitor usage in dashboard
- [ ] Upgrade to Hobby ($5/month) if needed

### MongoDB Atlas
- [ ] Free tier (M0) - 512MB storage
- [ ] No credit card required
- [ ] Monitor storage usage

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ App is accessible via Railway URL
- ✅ Frontend loads without errors
- ✅ Can register new users
- ✅ Can login with credentials
- ✅ Protected routes work (checkout, profile)
- ✅ Data is saved to MongoDB Atlas
- ✅ Auto-deploy works on push to main
- ✅ No errors in Railway logs
- ✅ No errors in browser console

## 📚 Important URLs

Save these for reference:

- **Railway Dashboard**: https://railway.app/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Your App URL**: `https://your-app-name.up.railway.app`
- **GitHub Repo**: `https://github.com/YOUR_USERNAME/YOUR_REPO`

## 🔐 Security Reminders

- ✅ Never commit `.env` file
- ✅ Use strong, unique JWT_SECRET for production
- ✅ MongoDB Atlas network access is configured
- ✅ All sensitive data in environment variables
- ✅ HTTPS is enabled (Railway provides this)

## 📞 Need Help?

- **Railway Docs**: https://docs.railway.app
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Your Deployment Guide**: See `RAILWAY_DEPLOYMENT.md`

---

**Last Updated**: 2026-02-05  
**Status**: Ready for deployment! 🚀
