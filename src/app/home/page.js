'use client';
import { useEffect, useState, useRef } from 'react';
import { auth } from '../../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/navbar';
import useUndoRedo from '../../../hooks/undoredo';


const categories = [
  { name: 'Python', path: 'python', character: '🐍', type: 'Technical' },
  { name: 'DBMS', path: 'dbms', character: '💾', type: 'Technical' },
  { name: 'AI', path: 'ai', character: '🤖', type: 'Technical' },
  { name: 'Networking', path: 'networking', character: '🌐', type: 'Technical' },
  { name: 'Sports', path: 'sports', character: '🏆', type: 'Non-Technical' },
  { name: 'General', path: 'general', character: '🧠', type: 'Non-Technical' },
  { name: 'Maths', path: 'maths', character: '➗', type: 'Non-Technical' },
  { name: 'Science', path: 'science', character: '🔬', type: 'Non-Technical' }
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useUndoRedo('Technical');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredPosition, setHoveredPosition] = useState({ top: 0, left: 0 });
  const [user, setUser] = useState(null);
  const router = useRouter();
  const containerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleCategorySelect = (category) => {
    router.push(`/quiz/startsection?category=${category}`); 
  };

  const handleMouseEnter = (category, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    setHoveredCategory(category.character);
    setHoveredPosition({
      top: rect.top - containerRect.top + 30,  // Move emoji above the box
      left: rect.left - containerRect.left + rect.width / 2 - 0 // Center emoji
    });
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div style={styles.pageContainer} ref={containerRef}>
      <Navbar />

      {/* Character now correctly appears above the hovered category */}
      {hoveredCategory && (
        <div 
          style={{
            ...styles.characterBox,
            top: `${hoveredPosition.top}px`,
            left: `${hoveredPosition.left}px`
          }}
        >
          <span style={styles.character}>{hoveredCategory}</span>
        </div>
      )}

      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to Quiz Master!</h1>
        <h2 style={styles.subtitle}>Select a Category</h2>

        {/* Toggle Technical / Non-Technical */}
        <div style={styles.toggleBox}>
          <button
            onClick={() => setSelectedCategory('Technical')}
            style={selectedCategory === 'Technical' ? styles.selectedToggleButton : styles.toggleButton}
          >
            Technical
          </button>
          <button
            onClick={() => setSelectedCategory('Non-Technical')}
            style={selectedCategory === 'Non-Technical' ? styles.selectedToggleButton : styles.toggleButton}
          >
            Non-Technical
          </button>
        </div>

        <div style={styles.categoryList}>
          {categories
            .filter(category => category.type === selectedCategory)
            .map((category) => (
              <div
                key={category.path}
                onMouseEnter={(event) => handleMouseEnter(category, event)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleCategorySelect(category.path)}
                style={styles.categoryBox}
              >
                <span style={styles.categoryText}>{category.name}</span>
              </div>
          ))} 
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#000',
    color: '#fff',
    textAlign: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '20px'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '2rem',
    marginBottom: '30px'
  },
  toggleBox: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#333',
    borderRadius: '10px',
    marginBottom: '90px',
  },
  toggleButton: {
    padding: '15px 30px',
    fontSize: '1.5rem',
    backgroundColor: '#444',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.3s',
  },
  selectedToggleButton: {
    padding: '15px 30px',
    fontSize: '1.5rem',
    backgroundColor: '#2E7D32',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  categoryList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    width: '80%',
    justifyContent: 'center',
    marginTop: '20px'
  },
  categoryBox: {
    position: 'relative',
    width: '220px',
    height: '160px',
    backgroundColor: '#222',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    textAlign: 'center',
    fontWeight: 'bold',
    border: '2px solid transparent'
  },
  categoryText: {
    position: 'relative',
    zIndex: 2
  },
  characterBox: {
    position: 'absolute',
    transform: 'translate(-50%, -100%) scale(1)',
    fontSize: '6rem',
    opacity: 1,
    transition: 'opacity 0.3s ease, transform 0.5s ease',
  },
  character: {
    display: 'block',
  }
};

export default HomePage;

