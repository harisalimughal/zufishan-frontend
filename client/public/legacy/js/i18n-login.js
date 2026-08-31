window.translations = {
  en: {
    eyebrowSide: "ONE PLATFORM, DIFFERENT DOORS",
    foot1: "Credential-checked before access",
    foot2: "412 Verified Ustaz",
    roleSelectLabel: "I am signing in as",
    roleLearner: "Learner", roleLearnerDesc: "Courses, Hifz, Fatwa",
    roleTeacher: "Ustaz / Teacher", roleTeacherDesc: "Verified scholar login",
    roleVendor: "Vendor", roleVendorDesc: "Marketplace seller",
    roleAdmin: "Board / Admin", roleAdminDesc: "Moderation & governance",
    stayIn: "Stay signed in",
    forgot: "Forgot password?",
    or: "or",
    google: "Continue with Google",
    identifierError: "Enter a valid email address or phone number.",
    passwordError: "Password must be at least 8 characters."
  },
  ur: {
    eyebrowSide: "ایک پلیٹ فارم، مختلف دروازے",
    foot1: "رسائی سے پہلے اسناد کی جانچ",
    foot2: "412 تصدیق شدہ اساتذہ",
    roleSelectLabel: "میں بطور سائن ان کر رہا ہوں",
    roleLearner: "طالب علم", roleLearnerDesc: "کورسز، حفظ، فتویٰ",
    roleTeacher: "استاذ / ٹیچر", roleTeacherDesc: "تصدیق شدہ عالم لاگ ان",
    roleVendor: "وینڈر", roleVendorDesc: "مارکیٹ پلیس فروخت کنندہ",
    roleAdmin: "بورڈ / ایڈمن", roleAdminDesc: "نگرانی اور طرزِ حکمرانی",
    stayIn: "سائن ان رہنے دیں",
    forgot: "پاسورڈ بھول گئے؟",
    or: "یا",
    google: "گوگل کے ساتھ جاری رکھیں",
    identifierError: "ایک درست ای میل ایڈریس یا فون نمبر درج کریں۔",
    passwordError: "پاسورڈ کم از کم 8 حروف پر مشتمل ہونا چاہیے۔"
  }
};

// Per-role copy that swaps with language — merged into login.js's roleData logic.
window.roleTranslations = {
  en: {
    learner: {
      title: "Welcome back",
      sub: "Sign in to pick up your courses, Hifz log, and Fatwa answers.",
      idLabel: "Email or phone",
      note: "",
      banner: null,
      submit: "Sign in as Learner",
      signup: 'New to Zulfishan? <a href="signup.html">Create a learner account</a>',
      sideHeadline: "Every role enters through the door built for what they need.",
      sideBody: "Learners track Hifz and ask a verified scholar. Teachers publish once the Advisory Board confirms their credentials. Vendors list once their documents clear review."
    },
    teacher: {
      title: "Ustaz / Teacher sign in",
      sub: "For scholars and madrasa graduates teaching on Zulfishan.",
      idLabel: "Registered scholar email",
      note: "Not verified yet? You can still sign in — your dashboard will show credential review status.",
      banner: "Sanad and madrasa credentials are required before your first course goes live.",
      submit: "Sign in as Ustaz",
      signup: 'Applying to teach? <a href="signup.html">Submit your credentials</a>',
      sideHeadline: "Your name goes on every lesson you publish.",
      sideBody: "The Advisory Board reviews your sanad and madrasa record before your first class goes live — every published lecture carries your verified name and credentials."
    },
    vendor: {
      title: "Vendor sign in",
      sub: "Manage your storefront, orders, and payouts.",
      idLabel: "Business email",
      note: "Ehram, Kafan and other ritual-sensitive listings require an additional verification step reviewed by the Advisory Board.",
      banner: "Vendor verification status is shown right after you sign in.",
      submit: "Sign in as Vendor",
      signup: 'Want to sell on Zulfishan? <a href="signup.html">Start vendor onboarding</a>',
      sideHeadline: "Trust here is separate from — and as strict as — scholar verification.",
      sideBody: "Every vendor clears document review before listing. Ritual-sensitive categories like Ehram and Kafan carry an extra compliance check."
    },
    admin: {
      title: "Board & Admin sign in",
      sub: "Moderation queue, credential review, and platform governance.",
      idLabel: "Internal email",
      note: "This portal is restricted to Moderators, Advisory Board members, and Super Admins. Two-factor confirmation will follow.",
      banner: "This portal is restricted, and all activity is logged for governance review.",
      submit: "Continue to secure sign-in",
      signup: 'Need access? Contact your platform administrator.',
      sideHeadline: "The layer that decides what the community sees is watched as closely as what it publishes.",
      sideBody: "Moderators, the Advisory Board, and Super Admins share one restricted door — every session here is logged for periodic review."
    }
  },
  ur: {
    learner: {
      title: "خوش آمدید",
      sub: "اپنے کورسز، حفظ لاگ اور فتویٰ کے جوابات دیکھنے کے لیے سائن ان کریں۔",
      idLabel: "ای میل یا فون",
      note: "",
      banner: null,
      submit: "بطور طالب علم سائن ان کریں",
      signup: 'زلفشاں پر نئے ہیں؟ <a href="signup.html">طالب علم اکاؤنٹ بنائیں</a>',
      sideHeadline: "ہر کردار کے لیے اُس کی ضرورت کے مطابق ایک الگ دروازہ۔",
      sideBody: "طالب علم اپنا حفظ ٹریک کرتے ہیں اور تصدیق شدہ عالم سے سوال پوچھتے ہیں۔ اساتذہ ایڈوائزری بورڈ کی تصدیق کے بعد پبلش کرتے ہیں۔ وینڈرز دستاویزات کی جانچ مکمل ہونے کے بعد فہرست بناتے ہیں۔"
    },
    teacher: {
      title: "استاذ / ٹیچر سائن ان",
      sub: "زلفشاں پر پڑھانے والے علماء اور مدرسہ فضلاء کے لیے۔",
      idLabel: "رجسٹرڈ عالم ای میل",
      note: "ابھی تصدیق نہیں ہوئی؟ آپ پھر بھی سائن ان کر سکتے ہیں — آپ کا ڈیش بورڈ اسناد کے جائزے کی صورتحال دکھائے گا۔",
      banner: "پہلا کورس شائع ہونے سے پہلے سند اور مدرسے کی اسناد درکار ہیں۔",
      submit: "بطور استاذ سائن ان کریں",
      signup: 'پڑھانے کے لیے درخواست دینا چاہتے ہیں؟ <a href="signup.html">اپنی اسناد جمع کروائیں</a>',
      sideHeadline: "آپ کا نام ہر اُس سبق پر ہوتا ہے جو آپ شائع کرتے ہیں۔",
      sideBody: "ایڈوائزری بورڈ آپ کی سند اور مدرسے کا ریکارڈ جانچتا ہے اس سے پہلے کہ آپ کی پہلی کلاس شائع ہو — ہر شائع شدہ لیکچر آپ کے تصدیق شدہ نام اور اسناد کے ساتھ ہوتا ہے۔"
    },
    vendor: {
      title: "وینڈر سائن ان",
      sub: "اپنا اسٹور فرنٹ، آرڈرز اور ادائیگیاں منظم کریں۔",
      idLabel: "کاروباری ای میل",
      note: "احرام، کفن اور دیگر مذہبی لحاظ سے حساس مصنوعات کے لیے ایڈوائزری بورڈ کی اضافی تصدیق درکار ہے۔",
      banner: "وینڈر تصدیق کی صورتحال سائن ان کرنے کے فوراً بعد دکھائی جاتی ہے۔",
      submit: "بطور وینڈر سائن ان کریں",
      signup: 'زلفشاں پر فروخت کرنا چاہتے ہیں؟ <a href="signup.html">وینڈر آن بورڈنگ شروع کریں</a>',
      sideHeadline: "یہاں اعتماد، عالم کی تصدیق سے الگ — مگر اتنا ہی سخت ہے۔",
      sideBody: "ہر وینڈر فہرست بنانے سے پہلے دستاویزات کی جانچ سے گزرتا ہے۔ احرام اور کفن جیسی حساس اقسام میں اضافی تعمیل چیک ہوتا ہے۔"
    },
    admin: {
      title: "بورڈ اور ایڈمن سائن ان",
      sub: "نگرانی کی قطار، اسناد کا جائزہ، اور پلیٹ فارم کی طرزِ حکمرانی۔",
      idLabel: "اندرونی ای میل",
      note: "یہ پورٹل صرف ماڈریٹرز، ایڈوائزری بورڈ اراکین اور سپر ایڈمنز کے لیے مخصوص ہے۔ دو مرحلہ تصدیق کے بعد رسائی ملے گی۔",
      banner: "یہ پورٹل محدود ہے، اور تمام سرگرمی طرزِ حکمرانی کے جائزے کے لیے لاگ کی جاتی ہے۔",
      submit: "محفوظ سائن ان کی طرف جاری رکھیں",
      signup: 'رسائی درکار ہے؟ اپنے پلیٹ فارم ایڈمن سے رابطہ کریں۔',
      sideHeadline: "جو تہہ یہ طے کرتی ہے کہ کمیونٹی کیا دیکھتی ہے، اُسے اتنی ہی باریک بینی سے دیکھا جاتا ہے جتنا وہ شائع کرتی ہے۔",
      sideBody: "ماڈریٹرز، ایڈوائزری بورڈ اور سپر ایڈمنز ایک ہی محدود دروازہ استعمال کرتے ہیں — یہاں ہر سیشن وقتاً فوقتاً جائزے کے لیے لاگ کیا جاتا ہے۔"
    }
  }
};
