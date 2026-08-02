/**
 * Sahayak – Supabase data-access helpers (Phase 1)
 *
 * Every function gracefully returns null / empty arrays when Supabase is not
 * configured, so callers can fall back to localStorage without extra checks.
 */
import { supabase, isSupabaseConfigured } from './client.js';

// ── Profiles ──────────────────────────────────────────────────────────────────

export async function fetchProfile(userId) {
  if (!isSupabaseConfigured || !userId) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error && error.code !== 'PGRST116') console.error('[DB] fetchProfile:', error.message);
  return data ?? null;
}

export async function upsertProfile(userId, profileData) {
  if (!isSupabaseConfigured || !userId) return null;
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...profileData, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) console.error('[DB] upsertProfile:', error.message);
  return data ?? null;
}

// ── Saved Schemes ─────────────────────────────────────────────────────────────

export async function fetchSavedSchemeIds(userId) {
  if (!isSupabaseConfigured || !userId) return null;
  const { data, error } = await supabase
    .from('saved_schemes')
    .select('scheme_id')
    .eq('user_id', userId);
  if (error) console.error('[DB] fetchSavedSchemeIds:', error.message);
  return data ? data.map(r => r.scheme_id) : [];
}

export async function saveScheme(userId, schemeId, stateId) {
  if (!isSupabaseConfigured || !userId) return null;
  const { error } = await supabase
    .from('saved_schemes')
    .upsert({ user_id: userId, scheme_id: schemeId, state_id: stateId });
  if (error) console.error('[DB] saveScheme:', error.message);
}

export async function unsaveScheme(userId, schemeId) {
  if (!isSupabaseConfigured || !userId) return;
  const { error } = await supabase
    .from('saved_schemes')
    .delete()
    .eq('user_id', userId)
    .eq('scheme_id', schemeId);
  if (error) console.error('[DB] unsaveScheme:', error.message);
}

// ── Applications ──────────────────────────────────────────────────────────────

export async function submitApplication(userId, applicationData) {
  if (!isSupabaseConfigured || !userId) return null;
  const { data, error } = await supabase
    .from('applications')
    .insert({ user_id: userId, ...applicationData })
    .select()
    .single();
  if (error) {
    console.error('[DB] submitApplication:', error.message);
    return null;
  }
  return data;
}

export async function fetchApplications(userId) {
  if (!isSupabaseConfigured || !userId) return null;
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) console.error('[DB] fetchApplications:', error.message);
  return data ?? [];
}

export async function fetchApplicationByScheme(userId, schemeId) {
  if (!isSupabaseConfigured || !userId) return null;
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', userId)
    .eq('scheme_id', schemeId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();
  if (error && error.code !== 'PGRST116') console.error('[DB] fetchApplicationByScheme:', error.message);
  return data ?? null;
}

export async function updateApplicationStatus(applicationId, status, notes = '') {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('applications')
    .update({ status, notes })
    .eq('id', applicationId)
    .select()
    .single();
  if (error) console.error('[DB] updateApplicationStatus:', error.message);
  return data ?? null;
}

// ── Chat Logs ─────────────────────────────────────────────────────────────────

export async function insertChatLog(userId, logData) {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('chat_logs')
    .insert({ user_id: userId ?? null, ...logData })
    .select()
    .single();
  if (error) console.error('[DB] insertChatLog:', error.message);
  return data ?? null;
}

// ── Flagged Responses ─────────────────────────────────────────────────────────

export async function insertFlaggedResponse(userId, flagData) {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('flagged_responses')
    .insert({ user_id: userId ?? null, ...flagData })
    .select()
    .single();
  if (error) console.error('[DB] insertFlaggedResponse:', error.message);
  return data ?? null;
}

export async function fetchFlaggedResponses() {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('flagged_responses')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) console.error('[DB] fetchFlaggedResponses:', error.message);
  return data ?? [];
}

export async function resolveFlaggedResponse(id, resolutionNote, resolvedBy) {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('flagged_responses')
    .update({
      status: 'resolved',
      resolution_note: resolutionNote,
      resolved_by: resolvedBy ?? null,
    })
    .eq('id', id)
    .select()
    .single();
  if (error) console.error('[DB] resolveFlaggedResponse:', error.message);
  return data ?? null;
}

// ── Telemetry ─────────────────────────────────────────────────────────────────

export async function logTelemetryEvent(userId, schemeId, eventType, stateId, district, metadata = {}) {
  if (!isSupabaseConfigured) return;
  const { error } = await supabase.from('telemetry_events').insert({
    user_id: userId ?? null,
    scheme_id: schemeId,
    state_id: stateId ?? null,
    district: district ?? null,
    event_type: eventType,
    metadata,
  });
  if (error) console.error('[DB] logTelemetryEvent:', error.message);
}

export async function fetchTelemetryAggregates(stateId) {
  if (!isSupabaseConfigured) return null;
  // Aggregate: count events per scheme per event_type for the given state
  const { data, error } = await supabase
    .from('telemetry_events')
    .select('scheme_id, event_type, district, created_at')
    .eq('state_id', stateId)
    .order('created_at', { ascending: false })
    .limit(5000);
  if (error) console.error('[DB] fetchTelemetryAggregates:', error.message);
  return data ?? null;
}
