# 📊 Google Analytics Quick Reference

## 🚀 Quick Setup (5 Minutes)

1. **Get Google Analytics ID**:
   - Go to https://analytics.google.com
   - Create account → Create property → Get Web Stream
   - Copy Measurement ID (format: `G-XXXXXXXXXX`)

2. **Add to your portfolio**:
   ```bash
   cd /home/ninja/Desktop/Portfolio/portfolio/client
   echo "VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX" > .env
   ```

3. **Deploy**:
   - Push to GitHub
   - Add `VITE_GA_MEASUREMENT_ID` in Vercel environment variables
   - Redeploy

## 📍 Where to Find Data

| What You Want | Where to Go in GA4 |
|---------------|-------------------|
| **Real-time visitors** | Reports → Realtime |
| **Visitor locations** | Reports → User → Demographics → Details |
| **Page views** | Reports → Engagement → Pages and screens |
| **How people found you** | Reports → Acquisition → Traffic acquisition |
| **What people clicked** | Reports → Engagement → Events |
| **Time on pages** | Reports → Engagement → Pages and screens |

## 🌍 Location Data Available

✅ **What you CAN see:**
- Country, Region, City (aggregated)
- Number of users from each location
- Time zone
- Language
- ISP/Network domain

❌ **What you CANNOT see:**
- Individual IP addresses (privacy protection)
- Street addresses
- Personal information

## 📈 What's Tracked Automatically

- ✅ Every page visit
- ✅ Time spent on each page
- ✅ User's location (city/country)
- ✅ Device type (mobile/desktop/tablet)
- ✅ Browser and OS
- ✅ Screen resolution
- ✅ How they found your site

## 🎯 Custom Events Tracked

| Event | When It Fires | Where to See |
|-------|---------------|--------------|
| `form_submit` | Contact form submission | Events → form_submit |
| `social_interaction` | Social media clicks | Events → social_interaction |
| `external_link_click` | External links clicked | Events → external_link_click |
| `file_download` | CV/Resume downloads | Events → file_download |
| `view_item` | Project/cert viewed | Events → view_item |
| `click` | Navigation clicks | Events → click |

## ⏱️ How Long Until I See Data?

- **Real-time**: 30-60 seconds
- **Standard reports**: 24-48 hours
- **Full demographic data**: 2-3 days

## 🔧 Testing Your Setup

```bash
# 1. Start dev server
cd /home/ninja/Desktop/Portfolio/portfolio/client
npm run dev

# 2. Check browser console
# Should see: "Google Analytics initialized with ID: G-XXXXXXXXXX"

# 3. Visit Google Analytics → Realtime
# Should see your visit appear within 60 seconds
```

## 📱 Most Useful Reports

### 1. **Realtime Overview** (Who's on your site NOW)
Reports → Realtime
- Active users right now
- What pages they're viewing
- Where they're from

### 2. **Location Report** (Where visitors come from)
Reports → User → Demographics → Details
- Change dimension to "Country" or "City"
- See visitor counts per location

### 3. **Popular Pages** (What people view most)
Reports → Engagement → Pages and screens
- Page views per page
- Average time on page
- Bounce rate

### 4. **Traffic Sources** (How people find you)
Reports → Acquisition → Traffic acquisition
- Direct (typed URL)
- Organic (Google search)
- Social (LinkedIn, Twitter)
- Referral (other sites)

### 5. **Click Tracking** (What people click)
Reports → Engagement → Events
- Look for: click, social_interaction, external_link_click
- See which buttons/links get most clicks

## 🎨 Advanced: Custom Reports

### Track Specific Section Views
Add to any component:

```typescript
import { trackSectionView } from '../utils/analytics';

// In useEffect or onClick
trackSectionView('Hero Section');
```

### Track Search
```typescript
import { trackSearch } from '../utils/analytics';

trackSearch('keyword');
```

### Track Custom Events
```typescript
import { trackEvent } from '../utils/analytics';

trackEvent('custom_action', {
  property1: 'value1',
  property2: 'value2'
});
```

## 🔐 Privacy Notes

- ✅ IP anonymization enabled by default
- ✅ No ad personalization signals sent
- ✅ GDPR compliant setup
- ⚠️ Consider adding cookie consent banner for EU visitors

## 🚨 Troubleshooting

**Problem**: No data showing up
**Solution**: 
1. Check `.env` file has correct Measurement ID
2. Restart dev server after adding `.env`
3. Check browser console for errors
4. Disable ad blockers
5. Wait 24 hours for full reports

**Problem**: Real-time works but no historical data
**Solution**: Wait 24-48 hours, data takes time to process

**Problem**: Location shows "(not set)"
**Solution**: Some users may block location data, this is normal

## 📞 Resources

- **Google Analytics Help**: https://support.google.com/analytics
- **GA4 Documentation**: https://developers.google.com/analytics/devguides/collection/ga4
- **YouTube Tutorials**: Search "Google Analytics 4 tutorial"

## 🎯 Key Metrics to Watch

1. **Users**: Total unique visitors
2. **Sessions**: Number of visits
3. **Page Views**: Total pages viewed
4. **Avg. Session Duration**: How long people stay
5. **Bounce Rate**: % who leave after one page
6. **Top Countries**: Where visitors are from
7. **Top Pages**: Most viewed pages
8. **Traffic Sources**: How they found you

---

**Need detailed setup?** See [GOOGLE_ANALYTICS_SETUP.md](./GOOGLE_ANALYTICS_SETUP.md)
