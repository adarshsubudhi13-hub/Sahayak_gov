/**
 * Input validation and sanitization utilities.
 *
 * Used across AuthPage (phone/OTP), ProfilePage (profile fields),
 * ChatPage (query text), and ApplyPage (notes).
 *
 * Security principles applied:
 * - Strip HTML/script tags to prevent XSS
 * - Enforce field-level length limits
 * - Whitelist-based validation where possible
 * - Never trust client-side validation alone — server validates too
 */

// ── Sanitization ──────────────────────────────────────────────────────────────

/**
 * Strip HTML tags and trim whitespace. Prevents XSS in text fields.
 */
export function sanitizeText(value, maxLength = 500) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')           // strip HTML tags
    .replace(/javascript:/gi, '')      // strip JS URIs
    .replace(/on\w+\s*=/gi, '')        // strip event handlers
    .trim()
    .slice(0, maxLength);
}

/**
 * Sanitize a number field — ensure it's within bounds.
 */
export function sanitizeNumber(value, min, max) {
  const n = Number(value);
  if (isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

// ── Validators ────────────────────────────────────────────────────────────────

/** Indian mobile number: 10 digits, optionally prefixed with +91 */
export function validatePhone(phone) {
  const cleaned = phone.replace(/\s+/g, '').replace(/^\+91/, '');
  if (!/^\d{10}$/.test(cleaned)) {
    return { valid: false, error: 'Enter a valid 10-digit Indian mobile number.' };
  }
  // Reject obviously fake numbers
  if (/^(\d)\1{9}$/.test(cleaned)) {
    return { valid: false, error: 'This mobile number is not valid.' };
  }
  return { valid: true, normalized: cleaned };
}

/** 6-digit OTP */
export function validateOtp(otp) {
  const cleaned = otp.replace(/\D/g, '');
  if (cleaned.length !== 6) {
    return { valid: false, error: 'OTP must be exactly 6 digits.' };
  }
  return { valid: true, normalized: cleaned };
}

/** Profile field validations */
export function validateProfile(profile) {
  const errors = {};

  const name = sanitizeText(profile.full_name || '', 100);
  if (!name || name.length < 2) errors.full_name = 'Full name must be at least 2 characters.';

  const age = sanitizeNumber(profile.age, 1, 120);
  if (age < 1 || age > 120) errors.age = 'Age must be between 1 and 120.';

  const validGenders = ['male', 'female', 'other', 'prefer_not_to_say'];
  if (!validGenders.includes(profile.gender)) errors.gender = 'Invalid gender selection.';

  const validCategories = ['SC', 'ST', 'OBC', 'General'];
  if (!validCategories.includes(profile.social_category)) errors.social_category = 'Invalid social category.';

  const validIncomeBands = ['below_1L', '1L_2L', '2L_5L', 'above_5L'];
  if (!validIncomeBands.includes(profile.annual_income_band)) errors.annual_income_band = 'Invalid income band.';

  if (!profile.district || profile.district.length < 2) errors.district = 'Please select a valid district.';

  return { valid: Object.keys(errors).length === 0, errors };
}

/** Chat query validation */
export function validateChatQuery(query) {
  const cleaned = sanitizeText(query, 1000);
  if (!cleaned || cleaned.length < 3) {
    return { valid: false, error: 'Please enter at least 3 characters.', cleaned };
  }
  if (cleaned.length > 1000) {
    return { valid: false, error: 'Query is too long. Please limit to 1000 characters.', cleaned };
  }
  return { valid: true, cleaned };
}

/** Application notes validation */
export function validateNotes(notes) {
  const cleaned = sanitizeText(notes || '', 1000);
  return { valid: true, cleaned }; // notes are optional; just sanitize
}
