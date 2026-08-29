/**
 * AfterMe Mobile Types
 * Defines and re-exports data contracts matching @afterme/shared
 */

export type MemoryType = 
  | 'belonging'
  | 'location'
  | 'task'
  | 'event'
  | 'person'
  | 'document'
  | 'idea'
  | 'other';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type MemoryStatus = 
  | 'active'
  | 'potentially_forgotten'
  | 'retrieved'
  | 'completed'
  | 'archived';

export interface Memory {
  id: string;
  user_id: string;
  original_text: string;
  memory_type: MemoryType;
  object?: string | null;
  task?: string | null;
  event?: string | null;
  person?: string | null;
  location?: string | null;
  action?: string | null;
  date?: string | null;
  time?: string | null;
  deadline?: string | null;
  importance: RiskLevel;
  risk_level: RiskLevel;
  status: MemoryStatus;
  latitude?: number | null;
  longitude?: number | null;
  radius?: number | null;
  image_url?: string | null;
  related_memory_ids?: string[];
  created_at: string;
  updated_at: string;
}

export interface ProactiveAlert {
  id: string;
  user_id: string;
  memory_id: string;
  memory: Memory;
  trigger_type: 'location_departure' | 'geofence_departure' | 'time_reminder' | 'context_change';
  title: string;
  message: string;
  severity: RiskLevel;
  distance_meters?: number;
  created_at: string;
  is_dismissed: boolean;
}

export interface AskResponse {
  answer: string;
  relevant_memories: Memory[];
  has_match: boolean;
  confidence: number;
  follow_up_hint?: string;
}

export type FoundationStatus = 'ready' | 'loading' | 'error';

export interface MobileAppConfig {
  apiUrl: string;
  defaultUserId: string;
  version: string;
  isDev: boolean;
}

export interface ApiHealthStatus {
  connected: boolean;
  checkedAt: string | null;
  endpoint: string;
  latencyMs?: number;
  error?: string;
}
