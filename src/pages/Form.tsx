import React, { useState } from 'react';
import axios from 'axios';
import Editor from '@monaco-editor/react';
import Navbar from '../component/Navbar';

const Form: React.FC = () => {
    const [outPut, setOutPut] = useState('')
    const [isError, setIsError] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        language: '',
        stdin: '',
        code: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function runTheCode() {
        setIsError(false)
        if (!formData.code || !formData.language) {
            return alert("Please enter code and language")
        }
        setOutPut('')
        try {
            const response = await axios.post('https://emkc.org/api/v1/piston/execute', {
                language: formData.language,
                source: formData.code
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.data;
            if (result.stderr) {
                setIsError(true)
            }
            setOutPut(result.output)
            return result;
        } catch (error) {
            console.error('Error executing code:', error);
            throw new Error('Error executing code');
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.code) {
            return alert("Please enter code")
        }
        try {
            await axios.post('http://localhost:3000/api/snippet', formData);
            alert('Snippet submitted successfully!');
            setFormData({ username: '', language: '', stdin: '', code: '' });
        } catch (error) {
            console.error('Error submitting snippet:', error);
            alert('Failed to submit snippet. Please try again later.');
        }
    };

    return (
        <>
            <Navbar />
            <div className='grid grid-cols-2 grid-flow-col'>
                <form onSubmit={handleSubmit} className="mx-20 pt-6 text-white">
                    <div className=''>
                        <div className='grid grid-cols-4 grid-flow-col gap-4'>
                            <div className="mb-4">
                                <label htmlFor="username" className="mb-1">Username:</label>
                                <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} required className="bg-gray-600 w-full px-3 py-1 border rounded-md focus:outline-none " />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="language" className="mb-1">Language:</label>
                                <select name="language" id="language" value={formData.language} onChange={handleChange} required className="bg-gray-600 w-full px-3 py-1 border rounded-md focus:outline-none ">
                                    <option value="">Select Language</option>
                                    <option value="cpp">C++</option>
                                    <option value="java">Java</option>
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="stdin" className="mb-1">Stdin:</label>
                                <input type="text" name="stdin" id="stdin" value={formData.stdin} onChange={handleChange} className="bg-gray-600 w-full px-3 py-1 border rounded-md focus:outline-none " />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="code" className="block mb-1">Code:</label>
                        <Editor
                            height="600px"
                            width='100%'
                            theme="vs-dark"
                            language={formData.language}
                            value={formData.code}
                            // onMount={handleEditorDidMount}
                            onChange={(code) => {
                                if (code !== undefined) { // Check if code is not undefined
                                    setFormData({ ...formData, code });
                                }
                            }}
                        />
                    </div>
                    <button type="submit" className="px-8 py-3 bg-blue-500 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300">Submit</button>
                </form>
                <div className=' pt-8 text-white'>
                    <button onClick={runTheCode} className="px-8 py-3 bg-green-500 text-white rounded-md focus:outline-none focus:ring focus:border-blue-300">Run Code</button>
                    <h1 className="font-bold pt-10 text-xl mb-2">
                        Output
                    </h1>
                    <div className={isError ? "w-11/12 h-[500px] p-3 bg-gray-700 rounded-md text-red-500 font-normal text-base overflow-y-auto" : "w-11/12 h-[500px] p-3 bg-gray-700 rounded-md text-white font-normal text-base overflow-y-auto"}>
                        {outPut ? outPut : 'Click "Run Code" to see the output here'}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Form;
