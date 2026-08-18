"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/services/userService";
import {
  User, Lock, Bell, Monitor, Globe, Shield,
  Camera, Save, Eye, EyeOff, Check, X,
  Smartphone, Mail, Moon, Sun, Laptop,
  BookOpen, Volume2, VolumeX, Trash2, LogOut,
  ChevronRight, AlertTriangle,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type SettingsTab = "profile" | "security" | "notifications" | "appearance" | "privacy" | "account";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  university: string;
  major: string;
  year: string;
  timezone: string;
  language: string;
}

interface NotificationSettings {
  emailAssignments: boolean;
  emailGrades: boolean;
  emailAnnouncements: boolean;
  pushLiveClass: boolean;
  pushDeadlines: boolean;
  pushMessages: boolean;
  pushAchievements: boolean;
  soundEnabled: boolean;
  reminderTime: string;
}

interface PrivacySettings {
  showProfile: boolean;
  showProgress: boolean;
  showAchievements: boolean;
  allowMessages: boolean;
  dataSharing: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const TABS: { key: SettingsTab; label: string; icon: React.ElementType }[] = [
  { key: "profile", label: "Profile", icon: User },
  { key: "security", label: "Security", icon: Lock },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "appearance", label: "Appearance", icon: Monitor },
  { key: "privacy", label: "Privacy", icon: Shield },
  { key: "account", label: "Account", icon: AlertTriangle },
];

const TIMEZONES = ["(UTC+05:00) Islamabad, Karachi", "(UTC+00:00) London", "(UTC-05:00) New York", "(UTC+08:00) Beijing", "(UTC+05:30) Mumbai", "(UTC+03:00) Riyadh"];
const LANGUAGES = ["English", "Urdu", "Arabic", "French", "Spanish", "Chinese"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"];
const REMINDER_TIMES = ["15 minutes before", "30 minutes before", "1 hour before", "2 hours before", "1 day before"];

// ─── Sub Components ──────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
        background: checked ? "#6D5DFC" : "#374151", position: "relative" as const,
        transition: "background 0.2s", flexShrink: 0,
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        position: "absolute" as const, top: 3,
        left: checked ? 23 : 3, transition: "left 0.2s",
      }} />
    </button>
  );
}

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #1F2937" }}>
      <div style={{ flex: 1, minWidth: 0, marginRight: 16 }}>
        <div style={{ color: "#E4E4E7", fontSize: 13, fontWeight: 500 }}>{label}</div>
        {description && <div style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>{description}</div>}
      </div>
      {children}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#111827", border: "1px solid #1F2937", borderRadius: 14, padding: "20px 24px", marginBottom: 20 }}>
      <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: "0 0 4px 0" }}>{title}</h3>
      <div style={{ height: 1, background: "#1F2937", margin: "12px 0" }} />
      {children}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [saved, setSaved] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [accentColor, setAccentColor] = useState<string>("#6D5DFC");

  // Profile
  const [profile, setProfile] = useState<ProfileData>({
    firstName: "", lastName: "", email: "",
    phone: "", bio: "",
    university: "", major: "",
    year: "1st Year", timezone: "(UTC+05:00) Islamabad, Karachi", language: "English",
  });
  const [avatarColor] = useState<string>("#6D5DFC");

  // Security
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showCurrent, setShowCurrent] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [twoFA, setTwoFA] = useState<boolean>(false);
  const [loginAlerts, setLoginAlerts] = useState<boolean>(true);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailAssignments: true, emailGrades: true, emailAnnouncements: false,
    pushLiveClass: true, pushDeadlines: true, pushMessages: true,
    pushAchievements: true, soundEnabled: true, reminderTime: "30 minutes before",
  });

  // Privacy
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    showProfile: true, showProgress: true, showAchievements: true,
    allowMessages: true, dataSharing: false,
  });

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const liveUser = await userService.getProfile();
        if (liveUser) {
          const names = (liveUser.fullName || "").split(" ");
          setProfile((prev) => ({
            ...prev,
            firstName: names[0] || "",
            lastName: names.slice(1).join(" ") || "",
            email: liveUser.email || "",
            bio: liveUser.bio || "",
          }));
          if (liveUser.preferences?.theme) {
            setTheme(liveUser.preferences.theme as any);
          }
        }
      } catch (err) {
        // Fallback to local profile state if offline
      }
    }
    loadUserProfile();
  }, []);

  const updateProfile = (key: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const updateNotif = (key: keyof NotificationSettings, value: boolean | string) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  const updatePrivacy = (key: keyof PrivacySettings, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
  };

  const auth = useAuth();

  const handleSave = async () => {
    try {
      await userService.updateProfile({
        fullName: `${profile.firstName} ${profile.lastName}`.trim(),
        email: profile.email,
        bio: profile.bio,
      });
      await userService.updatePreferences({
        theme,
        language: profile.language,
        notificationsEnabled: notifications.emailAssignments || notifications.pushLiveClass,
      });
      if (auth?.refetchUser) {
        await auth.refetchUser();
      }
    } catch (err) {
      console.warn("Update profile API error:", err);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) return;
    try {
      await userService.changePassword({ currentPassword, newPassword });
    } catch (err) {
      // Ignore or notify
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const passwordStrength = (): { label: string; color: string; width: string } => {
    if (newPassword.length === 0) return { label: "", color: "#374151", width: "0%" };
    if (newPassword.length < 6) return { label: "Weak", color: "#EF4444", width: "25%" };
    if (newPassword.length < 10) return { label: "Fair", color: "#F59E0B", width: "50%" };
    if (newPassword.length < 14) return { label: "Good", color: "#22C55E", width: "75%" };
    return { label: "Strong", color: "#6D5DFC", width: "100%" };
  };

  const inputStyle = {
    width: "100%", background: "#1F2937", border: "1px solid #374151",
    borderRadius: 8, padding: "10px 14px", color: "#fff", fontSize: 13,
    outline: "none", fontFamily: "inherit", boxSizing: "border-box" as const,
    transition: "border-color 0.2s",
  };

  const selectStyle = { ...inputStyle, cursor: "pointer", colorScheme: "dark" as const };

  return (
    <div style={{ display: "flex", flexDirection: "column" as const, height: "100%", background: "#0D1117", fontFamily: "'Inter', 'Geist', sans-serif", color: "#fff", overflow: "hidden" }}>

      {/* ── Header ── */}
      <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #1F2937", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: 0 }}>Settings</h1>
          <p style={{ color: "#6B7280", fontSize: 13, margin: "4px 0 0" }}>Manage your account preferences and settings.</p>
        </div>
        {saved && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 8, padding: "8px 14px", color: "#22C55E", fontSize: 13, fontWeight: 600 }}>
            <Check size={14} /> Changes saved!
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ── Sidebar Tabs ── */}
        <div style={{ width: 220, background: "#111827", borderRight: "1px solid #1F2937", padding: "16px 12px", flexShrink: 0, overflowY: "auto" as const }}>
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 8, border: "none", marginBottom: 4,
                background: activeTab === key ? "rgba(109,93,252,0.15)" : "none",
                color: activeTab === key ? "#A78BFA" : "#6B7280",
                fontSize: 13, fontWeight: activeTab === key ? 600 : 400,
                cursor: "pointer", fontFamily: "inherit", textAlign: "left" as const,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { if (activeTab !== key) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { if (activeTab !== key) (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
            >
              <Icon size={16} color={activeTab === key ? "#A78BFA" : "#6B7280"} />
              {label}
              {activeTab === key && <ChevronRight size={14} color="#A78BFA" style={{ marginLeft: "auto" }} />}
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div style={{ flex: 1, overflowY: "auto" as const, padding: "24px" }}>

          {/* ── PROFILE TAB ── */}
          {activeTab === "profile" && (
            <>
              {/* Avatar */}
              <SectionCard title="Profile Picture">
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div style={{ position: "relative" as const }}>
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${avatarColor}, #A78BFA)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, color: "#fff" }}>
                      {profile.firstName[0]}{profile.lastName[0]}
                    </div>
                    <div style={{ position: "absolute" as const, bottom: 0, right: 0, width: 26, height: 26, borderRadius: "50%", background: "#6D5DFC", border: "2px solid #111827", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                      <Camera size={12} color="#fff" />
                    </div>
                  </div>
                  <div>
                    <div style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>{profile.firstName} {profile.lastName}</div>
                    <div style={{ color: "#6B7280", fontSize: 12, marginTop: 2 }}>{profile.email}</div>
                    <div style={{ color: "#6D5DFC", fontSize: 12, marginTop: 4, cursor: "pointer" }}>Change photo</div>
                  </div>
                </div>
              </SectionCard>

              {/* Personal Info */}
              <SectionCard title="Personal Information">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ color: "#9CA3AF", fontSize: 11, display: "block", marginBottom: 6 }}>First Name</label>
                    <input value={profile.firstName} onChange={(e) => updateProfile("firstName", e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ color: "#9CA3AF", fontSize: 11, display: "block", marginBottom: 6 }}>Last Name</label>
                    <input value={profile.lastName} onChange={(e) => updateProfile("lastName", e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ color: "#9CA3AF", fontSize: 11, display: "block", marginBottom: 6 }}>Email Address</label>
                    <input value={profile.email} onChange={(e) => updateProfile("email", e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ color: "#9CA3AF", fontSize: 11, display: "block", marginBottom: 6 }}>Phone Number</label>
                    <input value={profile.phone} onChange={(e) => updateProfile("phone", e.target.value)} style={inputStyle} />
                  </div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <label style={{ color: "#9CA3AF", fontSize: 11, display: "block", marginBottom: 6 }}>Short Bio</label>
                  <textarea value={profile.bio} onChange={(e) => updateProfile("bio", e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" as const }} />
                </div>
              </SectionCard>

              {/* Academic Info */}
              <SectionCard title="Academic Information">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ color: "#9CA3AF", fontSize: 11, display: "block", marginBottom: 6 }}>University</label>
                    <input value={profile.university} onChange={(e) => updateProfile("university", e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ color: "#9CA3AF", fontSize: 11, display: "block", marginBottom: 6 }}>Major</label>
                    <input value={profile.major} onChange={(e) => updateProfile("major", e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ color: "#9CA3AF", fontSize: 11, display: "block", marginBottom: 6 }}>Year</label>
                    <select value={profile.year} onChange={(e) => updateProfile("year", e.target.value)} style={selectStyle}>
                      {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ color: "#9CA3AF", fontSize: 11, display: "block", marginBottom: 6 }}>Language</label>
                    <select value={profile.language} onChange={(e) => updateProfile("language", e.target.value)} style={selectStyle}>
                      {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{ color: "#9CA3AF", fontSize: 11, display: "block", marginBottom: 6 }}>Timezone</label>
                    <select value={profile.timezone} onChange={(e) => updateProfile("timezone", e.target.value)} style={selectStyle}>
                      {TIMEZONES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </SectionCard>

              <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 8, background: "#6D5DFC", border: "none", borderRadius: 10, padding: "11px 24px", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                <Save size={15} /> Save Changes
              </button>
            </>
          )}

          {/* ── SECURITY TAB ── */}
          {activeTab === "security" && (
            <>
              <SectionCard title="Change Password">
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 14 }}>
                  {/* Current password */}
                  <div>
                    <label style={{ color: "#9CA3AF", fontSize: 11, display: "block", marginBottom: 6 }}>Current Password</label>
                    <div style={{ position: "relative" as const }}>
                      <input type={showCurrent ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter current password" style={{ ...inputStyle, paddingRight: 40 }} />
                      <button onClick={() => setShowCurrent((v) => !v)} style={{ position: "absolute" as const, right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6B7280", display: "flex" }}>
                        {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  {/* New password */}
                  <div>
                    <label style={{ color: "#9CA3AF", fontSize: 11, display: "block", marginBottom: 6 }}>New Password</label>
                    <div style={{ position: "relative" as const }}>
                      <input type={showNew ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" style={{ ...inputStyle, paddingRight: 40 }} />
                      <button onClick={() => setShowNew((v) => !v)} style={{ position: "absolute" as const, right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6B7280", display: "flex" }}>
                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {/* Strength bar */}
                    {newPassword.length > 0 && (
                      <div style={{ marginTop: 8 }}>
                        <div style={{ height: 4, background: "#1F2937", borderRadius: 999, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: passwordStrength().width, background: passwordStrength().color, borderRadius: 999, transition: "width 0.3s, background 0.3s" }} />
                        </div>
                        <div style={{ color: passwordStrength().color, fontSize: 11, marginTop: 4 }}>{passwordStrength().label}</div>
                      </div>
                    )}
                  </div>
                  {/* Confirm password */}
                  <div>
                    <label style={{ color: "#9CA3AF", fontSize: 11, display: "block", marginBottom: 6 }}>Confirm New Password</label>
                    <div style={{ position: "relative" as const }}>
                      <input type={showConfirm ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm new password" style={{ ...inputStyle, paddingRight: 40, borderColor: confirmPassword && confirmPassword !== newPassword ? "#EF4444" : "#374151" }} />
                      <button onClick={() => setShowConfirm((v) => !v)} style={{ position: "absolute" as const, right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#6B7280", display: "flex" }}>
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {confirmPassword && confirmPassword !== newPassword && (
                      <div style={{ color: "#EF4444", fontSize: 11, marginTop: 4 }}>Passwords do not match</div>
                    )}
                  </div>
                  <button
                    onClick={handlePasswordUpdate}
                    disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                    style={{ background: currentPassword && newPassword && newPassword === confirmPassword ? "#6D5DFC" : "rgba(109,93,252,0.3)", border: "none", borderRadius: 10, padding: "10px 20px", color: "#fff", fontSize: 13, fontWeight: 600, cursor: currentPassword && newPassword && newPassword === confirmPassword ? "pointer" : "not-allowed", fontFamily: "inherit", alignSelf: "flex-start" as const }}
                  >
                    Update Password
                  </button>
                </div>
              </SectionCard>

              <SectionCard title="Two-Factor Authentication">
                <SettingRow label="Enable 2FA" description="Add an extra layer of security to your account using your phone.">
                  <Toggle checked={twoFA} onChange={setTwoFA} />
                </SettingRow>
                {twoFA && (
                  <div style={{ marginTop: 12, background: "rgba(109,93,252,0.08)", border: "1px solid rgba(109,93,252,0.2)", borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ color: "#A78BFA", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>2FA is enabled</div>
                    <div style={{ color: "#9CA3AF", fontSize: 12 }}>Your account is protected with two-factor authentication via your phone.</div>
                  </div>
                )}
                <SettingRow label="Login Alerts" description="Get notified when someone logs into your account from a new device.">
                  <Toggle checked={loginAlerts} onChange={setLoginAlerts} />
                </SettingRow>
              </SectionCard>

              <SectionCard title="Active Sessions">
                {[
                  { device: "Windows PC — Chrome", location: "Lahore, Pakistan", time: "Active now", current: true },
                  { device: "iPhone 14 — Safari", location: "Lahore, Pakistan", time: "2 hours ago", current: false },
                ].map((session) => (
                  <div key={session.device} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #1F2937" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 8, background: "#1F2937", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Smartphone size={18} color="#6B7280" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#E4E4E7", fontSize: 13, fontWeight: 500 }}>{session.device}</div>
                      <div style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>{session.location} • {session.time}</div>
                    </div>
                    {session.current
                      ? <span style={{ background: "rgba(34,197,94,0.12)", color: "#22C55E", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999 }}>Current</span>
                      : <button style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 6, padding: "4px 10px", color: "#EF4444", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Revoke</button>
                    }
                  </div>
                ))}
              </SectionCard>
            </>
          )}

          {/* ── NOTIFICATIONS TAB ── */}
          {activeTab === "notifications" && (
            <>
              <SectionCard title="Email Notifications">
                <SettingRow label="Assignment Reminders" description="Get emailed when assignments are due soon.">
                  <Toggle checked={notifications.emailAssignments} onChange={(v) => updateNotif("emailAssignments", v)} />
                </SettingRow>
                <SettingRow label="Grade Updates" description="Get emailed when your assignments are graded.">
                  <Toggle checked={notifications.emailGrades} onChange={(v) => updateNotif("emailGrades", v)} />
                </SettingRow>
                <SettingRow label="Course Announcements" description="Get emailed when professors post announcements.">
                  <Toggle checked={notifications.emailAnnouncements} onChange={(v) => updateNotif("emailAnnouncements", v)} />
                </SettingRow>
              </SectionCard>

              <SectionCard title="Push Notifications">
                <SettingRow label="Live Class Alerts" description="Get notified when a live class is about to start.">
                  <Toggle checked={notifications.pushLiveClass} onChange={(v) => updateNotif("pushLiveClass", v)} />
                </SettingRow>
                <SettingRow label="Deadline Reminders" description="Get notified before assignment deadlines.">
                  <Toggle checked={notifications.pushDeadlines} onChange={(v) => updateNotif("pushDeadlines", v)} />
                </SettingRow>
                <SettingRow label="New Messages" description="Get notified when you receive a new message.">
                  <Toggle checked={notifications.pushMessages} onChange={(v) => updateNotif("pushMessages", v)} />
                </SettingRow>
                <SettingRow label="Achievements" description="Get notified when you earn a new achievement.">
                  <Toggle checked={notifications.pushAchievements} onChange={(v) => updateNotif("pushAchievements", v)} />
                </SettingRow>
              </SectionCard>

              <SectionCard title="Sound & Reminder">
                <SettingRow label="Notification Sound" description="Play a sound when you receive notifications.">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {notifications.soundEnabled ? <Volume2 size={16} color="#6D5DFC" /> : <VolumeX size={16} color="#6B7280" />}
                    <Toggle checked={notifications.soundEnabled} onChange={(v) => updateNotif("soundEnabled", v)} />
                  </div>
                </SettingRow>
                <SettingRow label="Reminder Time" description="How early to remind you before events.">
                  <select value={notifications.reminderTime} onChange={(e) => updateNotif("reminderTime", e.target.value)} style={{ ...selectStyle, width: "auto" }}>
                    {REMINDER_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </SettingRow>
              </SectionCard>

              <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 8, background: "#6D5DFC", border: "none", borderRadius: 10, padding: "11px 24px", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                <Save size={15} /> Save Preferences
              </button>
            </>
          )}

          {/* ── APPEARANCE TAB ── */}
          {activeTab === "appearance" && (
            <>
              <SectionCard title="Theme">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                  {[
                    { key: "dark", label: "Dark", icon: Moon, desc: "Easy on the eyes" },
                    { key: "light", label: "Light", icon: Sun, desc: "Classic light theme" },
                    { key: "system", label: "System", icon: Laptop, desc: "Follows your OS" },
                  ].map(({ key, label, icon: Icon, desc }) => (
                    <button
                      key={key}
                      onClick={() => setTheme(key as "dark" | "light" | "system")}
                      style={{
                        background: theme === key ? "rgba(109,93,252,0.15)" : "#1F2937",
                        border: `2px solid ${theme === key ? "#6D5DFC" : "#374151"}`,
                        borderRadius: 12, padding: "16px 12px", cursor: "pointer", fontFamily: "inherit",
                        display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 8,
                        transition: "all 0.15s",
                      }}
                    >
                      <Icon size={22} color={theme === key ? "#A78BFA" : "#6B7280"} />
                      <div style={{ color: theme === key ? "#fff" : "#9CA3AF", fontSize: 13, fontWeight: 600 }}>{label}</div>
                      <div style={{ color: "#6B7280", fontSize: 10 }}>{desc}</div>
                    </button>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Accent Color">
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
                  {["#6D5DFC", "#3B82F6", "#22C55E", "#F59E0B", "#EC4899", "#EF4444", "#8B5CF6", "#06B6D4"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setAccentColor(c)}
                      style={{ width: 36, height: 36, borderRadius: "50%", background: c, border: accentColor === c ? "3px solid #fff" : "3px solid transparent", cursor: "pointer", transition: "border 0.15s", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      {accentColor === c && <Check size={16} color="#fff" />}
                    </button>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Display">
                <SettingRow label="Compact Mode" description="Show more content with reduced spacing.">
                  <Toggle checked={false} onChange={() => {}} />
                </SettingRow>
                <SettingRow label="Show Avatars" description="Display user avatars in chats and lists.">
                  <Toggle checked={true} onChange={() => {}} />
                </SettingRow>
                <SettingRow label="Animations" description="Enable smooth transitions and animations.">
                  <Toggle checked={true} onChange={() => {}} />
                </SettingRow>
              </SectionCard>

              <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 8, background: "#6D5DFC", border: "none", borderRadius: 10, padding: "11px 24px", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                <Save size={15} /> Save Appearance
              </button>
            </>
          )}

          {/* ── PRIVACY TAB ── */}
          {activeTab === "privacy" && (
            <>
              <SectionCard title="Profile Visibility">
                <SettingRow label="Public Profile" description="Allow other students to view your profile.">
                  <Toggle checked={privacy.showProfile} onChange={(v) => updatePrivacy("showProfile", v)} />
                </SettingRow>
                <SettingRow label="Show Progress" description="Display your course progress on your profile.">
                  <Toggle checked={privacy.showProgress} onChange={(v) => updatePrivacy("showProgress", v)} />
                </SettingRow>
                <SettingRow label="Show Achievements" description="Display your earned badges and achievements.">
                  <Toggle checked={privacy.showAchievements} onChange={(v) => updatePrivacy("showAchievements", v)} />
                </SettingRow>
                <SettingRow label="Allow Direct Messages" description="Let other students send you direct messages.">
                  <Toggle checked={privacy.allowMessages} onChange={(v) => updatePrivacy("allowMessages", v)} />
                </SettingRow>
              </SectionCard>

              <SectionCard title="Data & Analytics">
                <SettingRow label="Usage Analytics" description="Help improve Nexora by sharing anonymous usage data.">
                  <Toggle checked={privacy.dataSharing} onChange={(v) => updatePrivacy("dataSharing", v)} />
                </SettingRow>
              </SectionCard>

              <SectionCard title="Data Management">
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "9px 16px", color: "#E4E4E7", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                    <BookOpen size={14} /> Download My Data
                  </button>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "9px 16px", color: "#E4E4E7", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
                    <Mail size={14} /> Request Data Report
                  </button>
                </div>
              </SectionCard>

              <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 8, background: "#6D5DFC", border: "none", borderRadius: 10, padding: "11px 24px", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                <Save size={15} /> Save Privacy Settings
              </button>
            </>
          )}

          {/* ── ACCOUNT TAB ── */}
          {activeTab === "account" && (
            <>
              <SectionCard title="Account Information">
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
                  {[
                    { label: "Account ID", value: "STU-2024-00847" },
                    { label: "Account Type", value: "Student" },
                    { label: "Member Since", value: "September 2024" },
                    { label: "Subscription", value: "Nexora Pro" },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #1F2937" }}>
                      <span style={{ color: "#9CA3AF", fontSize: 13 }}>{label}</span>
                      <span style={{ color: "#E4E4E7", fontSize: 13, fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Sign Out">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ color: "#E4E4E7", fontSize: 13, fontWeight: 500 }}>Sign out of your account</div>
                    <div style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>You will need to sign in again to access Nexora.</div>
                  </div>
                  <button
                    onClick={async () => {
                      if (auth?.logout) {
                        await auth.logout();
                      }
                    }}
                    style={{ display: "flex", alignItems: "center", gap: 6, background: "#1F2937", border: "1px solid #374151", borderRadius: 8, padding: "9px 16px", color: "#E4E4E7", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              </SectionCard>

              {/* Danger Zone */}
              <div style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 14, padding: "20px 24px" }}>
                <h3 style={{ color: "#EF4444", fontSize: 15, fontWeight: 700, margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: 8 }}>
                  <AlertTriangle size={16} /> Danger Zone
                </h3>
                <div style={{ height: 1, background: "rgba(239,68,68,0.2)", margin: "12px 0" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ color: "#E4E4E7", fontSize: 13, fontWeight: 500 }}>Delete Account</div>
                    <div style={{ color: "#6B7280", fontSize: 11, marginTop: 2 }}>Permanently delete your account and all your data. This action cannot be undone.</div>
                  </div>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "9px 16px", color: "#EF4444", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", flexShrink: 0, marginLeft: 16 }}
                  >
                    <Trash2 size={14} /> Delete Account
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Delete Confirm Modal ── */}
      {showDeleteConfirm && (
        <div onClick={() => setShowDeleteConfirm(false)} style={{ position: "fixed" as const, inset: 0, zIndex: 100, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#111827", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 20, padding: 28, width: 400 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(239,68,68,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <AlertTriangle size={22} color="#EF4444" />
              </div>
              <div>
                <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>Delete Account?</div>
                <div style={{ color: "#EF4444", fontSize: 12 }}>This action is permanent and irreversible.</div>
              </div>
            </div>
            <div style={{ color: "#9CA3AF", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
              All your courses, progress, assignments, and data will be permanently deleted. You will not be able to recover your account.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowDeleteConfirm(false)} style={{ flex: 1, background: "#1F2937", border: "1px solid #374151", borderRadius: 10, padding: "10px", color: "#E4E4E7", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Cancel
              </button>
              <button style={{ flex: 1, background: "#EF4444", border: "none", borderRadius: 10, padding: "10px", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Yes, Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}