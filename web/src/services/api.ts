// 服务层：对接本地文件式后端 API
export interface DictionaryRecord {
  objectId: string;
  query?: string;
  original_form?: string;
  translation?: string;
  type?: string;
  pronunciation?: {
    stress_position?: string;
    transcription?: string;
  };
  content?: {
    related_words?: {
      synonyms?: string[];
      antonyms?: string[];
      word_family?: string[];
    };
  };
  grammar?: {
    part_of_speech?: string;
    gender?: string;
    case?: string;
    tense?: string;
    inflections?: string[];
  };
  usage?: {
    examples?: Array<{ russian: string; chinese: string }>;
    expressions?: Array<{ russian: string; chinese: string }>;
    contexts?: Array<{ russian: string; chinese: string }>;
  };
  cultural_notes?: string;
  etymology?: string;
  createdAt?: string;
  lastUpdated?: any;
  sentence_analysis?: {
    direct_translation?: string;
    grammar_analysis?: string;
    structure?: string;
    idioms_explained?: string;
  };
  tables?: unknown[];
}

export interface SearchResponse {
  results: DictionaryRecord[];
  limit: number;
  offset: number;
  q: string;
}

const BASE = '';

export async function searchDictionary(q: string, limit = 20, offset = 0): Promise<SearchResponse> {
  const url = `${BASE}/api/search?q=${encodeURIComponent(q)}&limit=${limit}&offset=${offset}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchById(id: string): Promise<DictionaryRecord> {
  const url = `${BASE}/api/by-id/${encodeURIComponent(id)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}


