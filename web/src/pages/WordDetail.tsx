import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchById, type DictionaryRecord } from '../services/api';
import { TableRenderer } from '../components/TableRenderer';

export default function WordDetail() {
  const { id } = useParams<{ id: string }>();
  const [word, setWord] = useState<DictionaryRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showRaw, setShowRaw] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    fetchById(id)
      .then(setWord)
      .catch((e: any) => setError(e?.message || '加载失败'))
      .finally(() => setLoading(false));
  }, [id]);

  const normalized = useMemo(() => {
    if (!word) return null;
    const fromContent = (key: string) => (word as any)?.content?.[key];
    const merge = (a: any, b: any) => ({ ...(a || {}), ...(b || {}) });

    const query = word.query || (word as any)?.content?.query || word.original_form;
    const translation = word.translation || (word as any)?.content?.translation;
    const pronunciation = merge(word.pronunciation, fromContent('pronunciation'));
    const grammar = merge(word.grammar, fromContent('grammar'));
    const usage = {
      examples: word.usage?.examples || fromContent('usage')?.examples || [],
      expressions: word.usage?.expressions || fromContent('usage')?.expressions || [],
      contexts: word.usage?.contexts || fromContent('usage')?.contexts || [],
    };
    const related_words = (word.content?.related_words || fromContent('related_words')) ?? {};
    const ai_explanation = (word as any).ai_explanation || fromContent('ai_explanation');
    const tables = word.tables || fromContent('tables') || [];
    const cultural_notes = (word as any).cultural_notes || fromContent('cultural_notes');
    const etymology = (word as any).etymology || fromContent('etymology');
    const type = word.type || fromContent('type');

    return {
      ...word,
      query,
      translation,
      pronunciation,
      grammar,
      usage,
      related_words,
      ai_explanation,
      tables,
      cultural_notes,
      etymology,
      type,
    } as any;
  }, [word]);

  const otherContentEntries = useMemo(() => {
    if (!word) return [] as Array<[string, any]>;
    const content: Record<string, any> = (word as any).content || {};
    const known = new Set([
      'query',
      'translation',
      'pronunciation',
      'grammar',
      'usage',
      'related_words',
      'ai_explanation',
      'tables',
      'cultural_notes',
      'etymology',
      'type',
    ]);
    return Object.entries(content).filter(([k]) => !known.has(k));
  }, [word]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (error || !normalized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">加载失败</h1>
          <p className="text-gray-600 mb-6">{error || '单词不存在'}</p>
          <Link to="/" className="btn-primary">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-primary-600">
              俄汉词典
            </Link>
            <Link to="/" className="btn-secondary">
              返回搜索
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 单词标题 */}
        <div className="card mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {normalized.query || word?.original_form}
              </h1>
              {normalized.translation && (
                <p className="text-2xl text-gray-600 mb-4">{normalized.translation}</p>
              )}
              {normalized.pronunciation?.transcription && (
                <p className="text-lg text-gray-500 font-mono">
                  [{normalized.pronunciation.transcription}]
                </p>
              )}
            </div>
            {normalized.pronunciation?.stress_position && (
              <div className="text-right">
                <span className="text-sm text-gray-500">重音位置</span>
                <p className="text-lg font-mono">{normalized.pronunciation.stress_position}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 语法信息 */}
          {normalized.grammar && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">语法信息</h2>
              <div className="space-y-3">
                {normalized.grammar.part_of_speech && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">词性</span>
                    <p className="text-lg">{normalized.grammar.part_of_speech}</p>
                  </div>
                )}
                {normalized.grammar.gender && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">性</span>
                    <p className="text-lg">{normalized.grammar.gender}</p>
                  </div>
                )}
                {normalized.grammar.inflections && normalized.grammar.inflections.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">变格</span>
                    <ul className="mt-2 space-y-1">
                      {normalized.grammar.inflections.map((inflection: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700">
                          {inflection}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 相关词汇 */}
          {normalized.related_words && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">相关词汇</h2>
              <div className="space-y-4">
                {normalized.related_words.synonyms && normalized.related_words.synonyms.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">同义词</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {normalized.related_words.synonyms.map((synonym: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {synonym}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {normalized.related_words.antonyms && normalized.related_words.antonyms.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">反义词</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {normalized.related_words.antonyms.map((antonym: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                          {antonym}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {normalized.related_words.word_family && normalized.related_words.word_family.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">词族</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {normalized.related_words.word_family.map((family: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {family}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI 解释 */}
          {normalized.ai_explanation && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">AI 解释</h2>
              <div className="space-y-3 text-gray-700">
                {normalized.ai_explanation.detailed_meaning && (
                  <p><span className="text-sm text-gray-500">释义：</span>{normalized.ai_explanation.detailed_meaning}</p>
                )}
                {normalized.ai_explanation.usage_guide && (
                  <p><span className="text-sm text-gray-500">用法：</span>{normalized.ai_explanation.usage_guide}</p>
                )}
                {normalized.ai_explanation.learning_tips && (
                  <p><span className="text-sm text-gray-500">学习建议：</span>{normalized.ai_explanation.learning_tips}</p>
                )}
                {normalized.ai_explanation.common_mistakes && (
                  <p><span className="text-sm text-gray-500">常见错误：</span>{normalized.ai_explanation.common_mistakes}</p>
                )}
              </div>
            </div>
          )}

          {/* 使用示例 */}
          {normalized.usage?.examples && normalized.usage.examples.length > 0 && (
            <div className="card lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">使用示例</h2>
              <div className="space-y-4">
                {normalized.usage.examples.map((example: any, index: number) => (
                  <div key={index} className="border-l-4 border-primary-200 pl-4">
                    <p className="text-lg text-gray-900 mb-1">{example.russian}</p>
                    <p className="text-gray-600">{example.chinese}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 固定搭配 */}
          {normalized.usage?.expressions && normalized.usage.expressions.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">固定搭配</h2>
              <div className="space-y-3">
                {normalized.usage.expressions.map((expression: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <p className="font-medium text-gray-900">{expression.russian}</p>
                    <p className="text-sm text-gray-600">{expression.chinese}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 语境示例 */}
          {normalized.usage?.contexts && normalized.usage.contexts.length > 0 && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">语境示例</h2>
              <div className="space-y-3">
                {normalized.usage.contexts.map((context: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <p className="font-medium text-gray-900">{context.russian}</p>
                    <p className="text-sm text-gray-600">{context.chinese}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 文化注释 */}
          {word.cultural_notes && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">文化注释</h2>
              <p className="text-gray-700 leading-relaxed">{word.cultural_notes}</p>
            </div>
          )}

          {/* 词源 */}
          {normalized.etymology && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">词源</h2>
              <p className="text-gray-700 leading-relaxed">{normalized.etymology}</p>
            </div>
          )}

          {/* 句子分析 */}
          {normalized.sentence_analysis && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">句子分析</h2>
              <div className="space-y-3">
                {normalized.sentence_analysis.direct_translation && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">直译</span>
                    <p className="text-gray-700">{normalized.sentence_analysis.direct_translation}</p>
                  </div>
                )}
                {normalized.sentence_analysis.grammar_analysis && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">语法分析</span>
                    <p className="text-gray-700">{normalized.sentence_analysis.grammar_analysis}</p>
                  </div>
                )}
                {normalized.sentence_analysis.structure && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">结构分析</span>
                    <p className="text-gray-700">{normalized.sentence_analysis.structure}</p>
                  </div>
                )}
                {normalized.sentence_analysis.idioms_explained && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">习语解释</span>
                    <p className="text-gray-700">{normalized.sentence_analysis.idioms_explained}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 表格数据 */}
          {normalized.tables && normalized.tables.length > 0 && (
            <div className="card lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">表格数据</h2>
              <div className="space-y-6">
                {normalized.tables.map((table: any, index: number) => (
                  <TableRenderer key={index} data={table} title={`表 ${index + 1}`} />
                ))}
              </div>
            </div>
          )}

          {/* 元数据信息 */}
          <div className="card lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">元数据</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-500">对象ID</span>
                <p className="text-gray-900 font-mono">{word.objectId}</p>
              </div>
              {normalized.type && (
                <div>
                  <span className="font-medium text-gray-500">类型</span>
                  <p className="text-gray-900">{normalized.type}</p>
                </div>
              )}
              {normalized.createdAt && (
                <div>
                  <span className="font-medium text-gray-500">创建时间</span>
                  <p className="text-gray-900">{new Date(normalized.createdAt).toLocaleString('zh-CN')}</p>
                </div>
              )}
              {normalized.lastUpdated && (
                <div>
                  <span className="font-medium text-gray-500">更新时间</span>
                  <p className="text-gray-900">
                    {typeof normalized.lastUpdated === 'string' 
                      ? new Date(normalized.lastUpdated).toLocaleString('zh-CN')
                      : new Date(normalized.lastUpdated.iso).toLocaleString('zh-CN')
                    }
                  </p>
                </div>
              )}
            </div>
            {/* 其他 content 字段 */}
            {otherContentEntries.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">其他内容</h3>
                <div className="space-y-2">
                  {otherContentEntries.map(([k, v]) => (
                    <div key={k} className="border border-gray-200 rounded-lg p-3">
                      <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{k}</div>
                      <pre className="text-sm whitespace-pre-wrap break-words text-gray-800">{JSON.stringify(v, null, 2)}</pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* 原始 JSON 折叠 */}
            <div className="mt-6">
              <button onClick={() => setShowRaw((s) => !s)} className="btn-secondary">
                {showRaw ? '隐藏原始 JSON' : '查看原始 JSON'}
              </button>
              {showRaw && (
                <pre className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs whitespace-pre-wrap break-words">
                  {JSON.stringify(word, null, 2)}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
