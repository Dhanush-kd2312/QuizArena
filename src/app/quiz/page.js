'use client'
import { useRouter } from 'next/navigation';  
import Navbar from '../../../components/navbar';  

const categories = [  
  { name: 'Sports', path: 'sports' },  
  { name: 'Health', path: 'health' },  
  { name: 'Science', path: 'science' },  
  { name: 'Maths', path: 'maths' },
  { name: 'Python', path: 'python' },
  { name: 'Networking', path: 'networking' },
  { name: 'DBMS', path: 'dbms' },
  { name: 'AI', path: 'ai' },  
];  

const CategoriesPage = () => {  
  const router = useRouter();  

  const handleCategorySelect = (categoryPath) => {  
    router.push(`/quiz/${categoryPath}`); // Redirect to quiz page for the selected category  
  };  

  return (  
    <div style={styles.container}>  
      <Navbar />  
      <h1>Select a Category</h1>  
      <div style={styles.categoryList}>  
        {categories.map((category) => (  
          <button  
            key={category.path}  
            onClick={() => handleCategorySelect(category.path)}  
            style={styles.categoryButton}  
          >  
            {category.name}  
          </button>  
        ))}  
      </div>  
    </div>  
  );  
};  

const styles = {  
  container: {  
    display: 'flex',  
    flexDirection: 'column',  
    alignItems: 'center',  
    justifyContent: 'center',  
    height: '100vh',  
    backgroundColor: '#f2f2f2',  
    padding: '20px',  
  },  
  categoryList: {  
    marginTop: '20px',  
    display: 'flex',  
    flexDirection: 'column',  
    alignItems: 'center',  
  },  
  categoryButton: {  
    padding: '15px 30px',  
    margin: '10px',  
    border: 'none',  
    borderRadius: '5px',  
    backgroundColor: '#4CAF50',  
    color: 'white',  
    cursor: 'pointer',  
    fontSize: '16px',  
    transition: 'background-color 0.3s',  
  },  
};  

export default CategoriesPage;