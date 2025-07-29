import React, { useEffect, useState } from 'react';

const Main = ({ username, onLogout }) => {
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGrades = async () => {
            setLoading(true);
            setError('');
            const isWEb = false;
            let response = "";
            
                if(!isWEb)
                {
                    const URLLocal = `http://localhost:5001/api/user/GetStudentGrade?username=${username}`;
                    response = await fetch(URLLocal,);
                }
                else
                {
                    const headers = new Headers();
                    const uname = "11253820";
                    const pword = "60-dayfreetrial";
                    const URLSmrt = `http://apnneji-001-site1.ktempurl.com/api/User/GetStudentGrade?username=${username}`;
                    
                    headers.set("Authorization", "Basic " + btoa(`${uname}:${pword}`));
                    
                    response = await fetch(URLSmrt
                            , {
                        method: "GET", // or POST, PUT, etc.
                        headers: headers,
                        }
                    );
                
                }
            try {
                if (response.ok) {
                    const data = await response.json();
                    setGrades(Array.isArray(data) ? data : [data]);
                } else {
                    setError('Failed to fetch grades.');
                }
            } catch (err) {
                setError('An error occurred while fetching grades.');
            }
            setLoading(false);
        };
        if (username) fetchGrades();
    }, [username]);

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'white',
            width: '100vw',
            overflow: 'auto',
        },
        mainContent: {
            padding: '30px',
            borderRadius: '10px',
            textAlign: 'center',
            width: '100%',
            maxWidth: '1200px',
            minWidth: '320px',
            background: 'linear-gradient(45deg, #ffc107, #007bff, #fd7e14)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        },
        tableWrapper: {
            width: '100%',
            overflowX: 'auto',
            marginTop: '30px',
        },
        table: {
            width: '100%',
            minWidth: '700px',
            backgroundColor: 'white',
            color: '#333',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        th: {
            backgroundColor: '#007bff',
            color: 'white',
            padding: '12px',
            fontSize: '18px',
        },
        td: {
            padding: '10px',
            borderBottom: '1px solid #eee',
            fontSize: '16px',
        },
        error: {
            color: 'red',
            marginTop: '20px',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.mainContent}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={onLogout} style={{ background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', padding: '8px 16px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
                        Logout
                    </button>
                </div>
                <h1>Welcome, {username && username.toUpperCase()}!</h1>
                {loading ? (
                    <p>Loading grades...</p>
                ) : error ? (
                    <p style={styles.error}>{error}</p>
                ) : (
                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>StudentName</th>
                                    <th style={styles.th}>SubjectName</th>
                                    <th style={styles.th}>First</th>
                                    <th style={styles.th}>Second</th>
                                    <th style={styles.th}>Third</th>
                                    <th style={styles.th}>Fourth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades.length === 0 ? (
                                    <tr><td colSpan="6" style={styles.td}>No grades found.</td></tr>
                                ) : (
                                    grades.map((grade, idx) => (
                                        <tr key={idx}>
                                            <td style={styles.td}>{grade.StudentName || ''}</td>
                                            <td style={styles.td}>{grade.subjectname || ''}</td>
                                            <td style={styles.td}>{grade.first ?? ''}</td>
                                            <td style={styles.td}>{grade.second ?? ''}</td>
                                            <td style={styles.td}>{grade.third ?? ''}</td>
                                            <td style={styles.td}>{grade.fourth ?? ''}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main; 