import { useCallback, useMemo, useState } from 'react';
import { searchDictionary, type DictionaryRecord } from '../services/api';

export function useSearchViewModel() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<DictionaryRecord[]>([]);

  const canSearch = useMemo(() => query.trim().length > 0, [query]);

  const onSearch = useCallback(async () => {
    if (!canSearch) return;
    setLoading(true);
    setError(null);
    try {
      const data = await searchDictionary(query.trim(), 20, 0);
      setResults(data.results);
    } catch (e: any) {
      setError(e?.message || '搜索失败');
    } finally {
      setLoading(false);
    }
  }, [query, canSearch]);

  return { query, setQuery, loading, error, results, onSearch, canSearch };
}


