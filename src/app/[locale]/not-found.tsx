
import Link from 'next/link'
import React from 'react'


const NotFound = () => {


  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        padding: '0 16px',
        backgroundColor: 'white',
        color: 'black',
        flexDirection: 'column',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            color: 'red',
            marginBottom: '16px',
          }}
        >
          404
        </h1>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#333',
            marginBottom: '8px',
          }}
        >
         Page Not Found
        </h2>
        <p
          style={{
            fontSize: '16px',
            color: '#666',
            marginBottom: '24px',
          }}
        >
          'Sorry, we couldn’t find the page you’re looking for
        </p>
        <a href='/'>
        <button
        
        style={{
          padding: '12px 24px',
            backgroundColor: '#1e40af',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
       
          >
         Back to Home
        </button>
          </a>
      </div>
    </div>
  )
}

export default NotFound
