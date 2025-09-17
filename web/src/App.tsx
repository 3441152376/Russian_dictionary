import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useSearchViewModel } from './viewmodels/searchViewModel';
import WordDetail from './pages/WordDetail';

function SearchPage() {
  const { query, setQuery, onSearch, loading, error, results, canSearch } = useSearchViewModel();

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canSearch) {
      onSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary-600">俄汉词典</h1>
            <a 
              href="http://localhost:3000/docs" 
              target="_blank" 
              rel="noreferrer"
              className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              API 文档
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* 搜索区域 */}
        <div className="card mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">俄汉词典查询</h2>
            <p className="text-gray-600">输入俄语或中文关键词进行搜索</p>
          </div>
          
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              placeholder="输入俄语或中文关键词..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field flex-1"
            />
            <button 
              disabled={!canSearch || loading} 
              onClick={onSearch}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  搜索中...
                </div>
              ) : (
                '搜索'
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* 搜索结果 */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              搜索结果 ({results.length} 条)
            </h3>
            {results.map((word) => (
              <div key={word.objectId} className="card hover:shadow-md transition-shadow">
                <Link to={`/word/${word.objectId}`} className="block">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {word.query || word.original_form}
                      </h4>
                      {word.translation && (
                        <p className="text-lg text-gray-600 mb-2">{word.translation}</p>
                      )}
                      {word.pronunciation?.transcription && (
                        <p className="text-sm text-gray-500 font-mono mb-2">
                          [{word.pronunciation.transcription}]
                        </p>
                      )}
                      {word.grammar?.part_of_speech && (
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {word.grammar.part_of_speech}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* 空状态 */}
        {query && results.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">未找到相关结果</h3>
            <p className="text-gray-600">请尝试其他关键词或检查拼写</p>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/word/:id" element={<WordDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
