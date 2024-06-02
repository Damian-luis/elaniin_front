import { useRouter } from 'next/router';
import { useEffect, useState,useContext } from 'react';
import React from 'react';
import { getBook, queryBook } from '../api/books';
import { Button, FormGroup, TextField } from '@mui/material';
import { Input } from '@mui/base/Input';
import SendIcon from '@mui/icons-material/Send';
//import { BooksContext } from '@/context/BooksContext';
import Link from 'next/link';
interface ConversationItem {
  question: string;
  response: string;
}

const BookDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  //const { availableBooks, setAvailableBooks } = useContext(BooksContext) as any
  //console.log(availableBooks)
  const [book, setBook] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<ConversationItem[]>([]); 
  const [responseLoading, setResponseLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const bookData = await getBook(id as string); // Convert id to string
          setBook(bookData.book); // Assuming you have initial book data
          setLoading(false);
          
        } catch ( error: Error | any) {
          if (error instanceof Error  && error.message) {
            setError(error.message);
          } else {
            setError('An unknown error occurred');
          }
          setLoading(false);
        }
      };
      fetchBook();
    }
  }, [id]);

  const handleQuestionSubmit = async () => {
    if (!question) return; 

    setResponseLoading(true);
    try {
      const response = await queryBook(id as string, question); 
      console.log("la pregunta es..." + question);
      
      const responseIa=response.answer
      console.log("la respuesta es..." + responseIa);
      setConversation([...conversation, { question, response:responseIa }]); 
    } catch (error) {
      console.error('Error submitting question:', error);
      // Implement specific error handling (e.g., display error message)
    } finally {
      setQuestion('');
      setResponseLoading(false);
    }
  };

  // Display Book Details and Conversation History
  const displayContent = () => (
    <div style={{
      width:"100%",
      height:"100vh",
      display:"flex"
      }}>


      <div style={{
        width:"20%"
      }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
  
</ul>

</ul>


      </div>

      <div style={{
        width:"80%",
        padding:"2%",
        gap:"20px",
        display:"flex",
        flexDirection:"column"
      }}>
        <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
          <div><h1>{book?.title}</h1></div>
          <div>{book?.summary}</div>
 
        </div>
              
              <div style={{display:"flex",
                flexDirection:"column",
                justifyContent:"space-around",
                gap:"20px"
              }}>
                <div>
              <h2>Conversación</h2>
              <ul>
              {conversation.map((item) => (
          <li key={item.question} style={{padding:"10px"}}>  
            Tú: {item.question} <br />
            AI: {item.response}
          </li>
        ))}
              </ul>
              </div>

<div>
              <div style={{display:"flex",justifyContent:"center",gap:"40px",right:"0px"}}>

              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Realizar una pregunta..."
                style={{
                  width:"50%",
                  padding:"2%",
                  borderRadius:"15px"
                }}
              />
        
              <Button style={{borderRadius:"15px"}} variant="contained" onClick={handleQuestionSubmit} disabled={responseLoading} endIcon={<SendIcon />}/>


              </div>
              </div>
              </div>

      </div>
      


      

    </div>
  );


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  return displayContent();
};

export default BookDetail;

