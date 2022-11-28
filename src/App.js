import React from 'react';
import './App';
import { fetchSearchResults } from './utils';
import ListItem from './components/ListItem/ListItem';
import SearchInput from './components/SearchInput/SearchInput';
import debounce from 'lodash.debounce';

const fetchData = async (query, cb) => {
    const res = await fetchSearchResults(query);
    cb(res);
};
const debouncedFetchData = debounce((query, cb) => {
    fetchData(query, cb);
}, 500);
export default function App() {
    const [query, setQuery] = React.useState('');
    const [results, setResults] = React.useState([]);

    React.useEffect(() => {
        debouncedFetchData(query, res => {
            setResults(res);
        });
    }, [query]);
    return (
        <div>
            <SearchInput
                value={query}
                onChangeText={e => {
                    setQuery(e.target.value);
                }}
            />
            {results.map((result, index) => (
                <div key={index}>
                    <ListItem
                        title={result.name}
                        imageUrl={result.image_url}
                        caption={result.tagline}
                    />
                </div>
            ))}
        </div>
    );
}