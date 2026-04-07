# FEATURE TESTING GUIDE

## ✅ MOMENT CAPTURE - Now Fully Implemented

### What's Been Fixed:
1. **Calendar Capture** - Shows date/time context when opening journal
2. **Location Capture** - Uses browser geolocation to get user coordinates
3. **Photo Capture** - Opens file picker and stores photo reference
4. **Quick Moment** - Fast text capture with mood selector

### How to Test:

#### Test Calendar Capture:
1. Login as Pro user
2. Press "+" floating button (Moment Capture)
3. Tap "Calendar Event"
4. Should navigate to Journal with prompt: `📅 Moment on YYYY-MM-DD at HH:MM`
5. Write entry and save ✓

#### Test Location Capture:
1. Login as Pro user
2. Press "+" floating button
3. Tap "Location"
4. Browser will ask for location permission
5. **Allow permission** → Should show: `📍 Location: XX.XXXX°, YY.YYYY°`
6. Or **Deny permission** → Should show: `📍 Where are you right now? What's on your mind?`
7. Write and save ✓

#### Test Photo Capture:
1. Login as Pro user
2. Press "+" floating button
3. Tap "Photo"
4. File picker opens
5. Select any image from device
6. Should navigate to Journal with: `📷 Photo captured`
7. Write description and save ✓

#### Test Quick Moment:
1. Login as Pro user
2. Press "+" floating button
3. Tap "Quick Moment"
4. Goes to Journal with: `📍 Quick Moment Capture`
5. Write and save ✓

#### Test Pro Gating:
1. Login as **Free user**
2. Press "+" floating button
3. Should show unlock modal: "Capture Moments - Effortlessly turn your life events into journal entries"
4. Button says "Start 7-day trial" ✓

---

## ✅ SMART NOTIFICATIONS - Pattern Detection Working

### How Pattern Detection Works:

The Smart Notifications Panel detects 4 types of patterns:

1. **Stress Trend** - If user mentions stress keywords (stress, anxious, worried, overwhelmed, panic, nervous, afraid, scared, pressure) in 3+ entries within last 7 days
   - Shows: "Stress mentions ↑ XX% (vs baseline)"

2. **Mood Improvement** - If recent mood (last 3 entries) is higher than older mood (entries 3-7)
   - Shows: "Mood trending ↑ +X.X pts"

3. **Best Day of Week** - If one day (Monday-Sunday) has average mood > 3.5 across 2+ entries
   - Shows: "Sundays are your best days (avg X.X/5)"

4. **Activity Correlation** - If activities (workout, exercise, gym, sleep, family, work, etc.) correlate with higher mood
   - Shows: "You feel better after exercise (avg X.X/5)"

### How to Test Smart Notifications:

#### Prerequisite: Create test entries
You need to create journal entries with specific keywords. Here's a test plan:

**Test 1: Stress Pattern Detection**
1. Create 3+ entries mentioning "stress" or "anxious" in last 7 days
   - Entry 1: "Today was stressful, lots of work pressure"
   - Entry 2: "Feeling anxious about the presentation"
   - Entry 3: "Overwhelmed by too many tasks"
2. Go to Insights screen
3. Should show: "Stress mentions ↑ 100% (vs baseline)" (or similar)

**Test 2: Mood Trend Detection**
1. Create 7+ entries with varying moods
   - Entries 1-3: Mood 4-5 (good/great)
   - Entries 4-7: Mood 1-2 (rough/low)
2. Go to Insights
3. Should show: "Mood trending ↑ +X pts" (comparing recent vs older)

**Test 3: Best Day of Week**
1. Create 5+ entries, clustering some on same day
   - 2+ entries on Sunday with mood 4-5
   - Other entries on different days with lower mood
2. Go to Insights
3. Should show: "Sundays are your best days (avg X.X/5)"

**Test 4: Activity Correlation**
1. Create entries mentioning activities:
   - 2+ entries with "workout" or "gym" with mood 4-5
   - Other entries without these words, lower mood
2. Go to Insights
3. Should show: "You feel better after exercise (avg X.X/5)"

**Test 5: Free User Lock**
1. Login as Free user
2. Go to Insights screen
3. Smart Notifications section should be BLURRED with LOCK icon
4. Button should say "Start trial" ✓

**Test 6: Pro User Unlock**
1. Login as Pro/Plus user
2. Go to Insights screen
3. Smart Notifications should be visible (not blurred)
4. If 3+ entries: Shows patterns
5. If <3 entries: Shows "Keep writing and I'll detect your patterns" ✓

---

## 🧪 TESTING CHECKLIST

### Moment Capture:
- [ ] Pro user: Calendar button works
- [ ] Pro user: Location button works
- [ ] Pro user: Photo button works
- [ ] Pro user: Quick Moment button works
- [ ] Free user: Gets lock modal when clicking "+"
- [ ] Free user: Can click "Start trial"
- [ ] Pro user: "+" floating button appears
- [ ] Free user: "+" floating button hidden
- [ ] All 4 options show in modal
- [ ] Modal closes after selection

### Smart Notifications:
- [ ] Pro user: Panel shows (not blurred)
- [ ] Free user: Panel shows blurred with lock
- [ ] <3 entries: Shows "Keep writing" message
- [ ] 3+ entries with stress keywords: Shows stress pattern
- [ ] 7+ entries: Shows mood trend
- [ ] 5+ entries: Shows best day of week
- [ ] Activity keywords detected: Shows activity pattern
- [ ] Patterns sorted by confidence (top 3)
- [ ] Each pattern has helpful tip

### Pro Gating:
- [ ] hasProAccess() returns true for Pro users
- [ ] hasProAccess() returns false for Free users
- [ ] Trial users: hasProAccess() works correctly
- [ ] After trial expires: hasProAccess() returns false
- [ ] All Pro features respect gating

---

## 📝 DETAILED TEST DATA SQL (for Supabase)

If you want to create test data directly in Supabase:

```sql
-- Get user_id first
SELECT id FROM auth.users WHERE email = 'test@example.com' LIMIT 1;

-- Insert test entries with stress pattern
INSERT INTO entries (user_id, text, mood, energy, entry_date) VALUES
  ('{user_id}', 'Today was really stressful. So much work pressure.', 2, 30, CURRENT_DATE - 6),
  ('{user_id}', 'Feeling anxious about tomorrow presentation.', 2, 40, CURRENT_DATE - 5),
  ('{user_id}', 'So overwhelmed with all the tasks piling up.', 1, 20, CURRENT_DATE - 4),
  ('{user_id}', 'Exercise helped, feeling better.', 4, 70, CURRENT_DATE - 3),
  ('{user_id}', 'Had a workout this morning, mood is good.', 4, 75, CURRENT_DATE - 2),
  ('{user_id}', 'Worked out again, feeling great!', 5, 80, CURRENT_DATE - 1),
  ('{user_id}', 'Great day overall, feeling amazing.', 5, 85, CURRENT_DATE);
```

After inserting test entries, go to Insights and you should see:
- "Stress mentions ↑ 100%" pattern
- "Mood trending ↑ +X.X pts" pattern
- "Exercise" activity pattern
- Possibly "Best day" if you create enough spread

---

## 🐛 TROUBLESHOOTING

**Smart Notifications not showing patterns?**
- Check console for errors: `F12 → Console`
- Verify entries exist in browser DevTools: `localStorage.getItem('nuju-entries')`
- Create entries with EXACT keywords (case-insensitive but must contain word)
- Need minimum entries: stress=3, trends=7, activities=2

**Moment Capture button not appearing?**
- Verify user is Pro: Check profile.plan in localStorage
- Check browser console for errors
- Refresh page

**Location not working?**
- Check browser permissions: Settings → Site Settings → Location
- Must use HTTPS or localhost
- Browser must support Geolocation API

**Photo not saving?**
- Check localStorage storage quota: `localStorage.getItem('nuju-pending-photo')`
- Try with smaller image file
- Check browser console for errors

---

## ✅ SUCCESS CRITERIA

All features are working when:
1. ✅ Moment Capture shows all 4 options in modal
2. ✅ Each capture type navigates to Journal with context
3. ✅ Pro users see features, Free users see lock
4. ✅ Smart Notifications detects patterns with real data
5. ✅ Pattern detection shows top 3 patterns sorted by confidence
6. ✅ Free users see blurred panel with lock icon
7. ✅ No console errors in DevTools

---

## 📦 WHAT'S NEXT

After verification:
1. Test all integrations (Supabase, Auth, Gemini)
2. Deploy delete_user RPC migration
3. Test Pro/Plus/Free gating across all screens
4. Create PR for review

