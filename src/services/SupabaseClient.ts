/**
 * Lightweight Supabase / Backend API Client with graceful unconfigured fallback.
 */

export interface SupabaseConfig {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
}

export class SupabaseClient {
  private static instance: SupabaseClient;
  private isConfigured: boolean = false;
  private url: string = '';
  private key: string = '';

  private constructor() {
    const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
    const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

    if (envUrl && envKey) {
      this.url = envUrl;
      this.key = envKey;
      this.isConfigured = true;
      console.log('⚡ Supabase Client initialized with environment credentials.');
    } else {
      console.log('ℹ️ Supabase credentials not found. Running in hybrid local mode ("SYNC PAUSED").');
    }
  }

  public static getInstance(): SupabaseClient {
    if (!SupabaseClient.instance) {
      SupabaseClient.instance = new SupabaseClient();
    }
    return SupabaseClient.instance;
  }

  public getIsConfigured(): boolean {
    return this.isConfigured;
  }

  public async fetch(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (!this.isConfigured) {
      throw new Error('Supabase client is not configured with valid API keys.');
    }

    const headers = {
      'Content-Type': 'application/json',
      apikey: this.key,
      Authorization: `Bearer ${this.key}`,
      ...(options.headers || {}),
    };

    const res = await fetch(`${this.url}/rest/v1/${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      throw new Error(`Supabase request failed: ${res.statusText}`);
    }

    return res.json();
  }
}

export const supabaseClient = SupabaseClient.getInstance();
