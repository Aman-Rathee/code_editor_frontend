import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../component/Navbar';

interface Snippet {
    id: number;
    username: string;
    language: string;
    stdin: string;
    code: string;
    created_at: string;
}

const SnippetList: React.FC = () => {
    const [snippets, setSnippets] = useState<Snippet[]>([]);

    useEffect(() => {
        // Fetch snippet data from the backend API on page load
        const fetchSnippets = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/snippets');
                setSnippets(response.data);
            } catch (error) {
                console.error('Error fetching snippets:', error);
            }
        };

        fetchSnippets();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="overflow-x-auto p-10">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Language</th>
                            <th className="px-4 py-2">Stdin</th>
                            <th className="px-4 py-2">Code Snippet</th>
                            <th className="px-4 py-2">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {snippets.map((snippet) => (
                            <tr key={snippet.id}>
                                <td className="border px-4 py-2">{snippet.username}</td>
                                <td className="border px-4 py-2">{snippet.language}</td>
                                <td className="border px-4 py-2">{snippet.stdin}</td>
                                <td className="border px-4 py-2">{snippet.code}</td>
                                <td className="border px-4 py-2">{snippet.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SnippetList;
