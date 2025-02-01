import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

interface SearchResult {
  id: string
  name: string
  type: 'employee' | 'object'
}

interface SearchBarProps {
  onSearch: (query: string) => SearchResult[]
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    if (query.length > 2) {
      const searchResults = onSearch(query)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [query, onSearch])

  return (
    <div className="w-full max-w-md">
      <div className="flex w-full items-center space-x-2">
        <Input
          type="text"
          placeholder="Search employees or objects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
      {results.length > 0 && (
        <ul className="mt-2 max-h-60 overflow-auto rounded-md border border-gray-200 bg-white shadow-sm">
          {results.map((result) => (
            <li
              key={result.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
            >
              <span>{result.name}</span>
              <span className="text-sm text-gray-500">{result.type}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
