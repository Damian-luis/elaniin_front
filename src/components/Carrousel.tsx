'use client';

import React, { useState, useEffect,useContext} from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { getAllBooks } from '@/pages/api/books';
import Link from 'next/link';
import { BooksContext } from '@/context/BooksContext';
//import { useRouter } from 'react-router-dom';
export interface Book {
  id: string;
  title: string;
  summary: string;
}
const TextMobileStepper = () => {
  const theme = useTheme();
  //const { availableBooks, setAvailableBooks } = useContext(BooksContext)
  const [activeStep, setActiveStep] = useState(0);
  const [books, setBooks] = useState([]);
  const maxSteps = books.length;
  const [error, setError] = useState(null);
  const truncatedSummary = (books[activeStep] as Book)?.summary?.slice(0, 40)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getAllBooks();
        
        console.log("aqui esta books")
        //console.log(booksData)
        if (booksData) {
          
          setBooks(booksData);
        }
      } catch (error) {
       //setError(error.message || 'Error fetching books');
      }
    };
    fetchBooks();
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  

  return (
    
    <Box sx={{ maxWidth: 400, flexGrow: 1,backgroundColor:"white",padding:"30px",borderRadius:"20px"}} >
        
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Link href={`/books/${(books[activeStep] as Book)?.id}`}>
        <Typography sx={{fontSize:"20px",fontWeight:"600"}}>{(books[activeStep] as Book)?.title}</Typography>
        </Link>
      </Paper>
      <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>
      {(books[activeStep] as Book)?.summary?.slice(0, 200)}
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
    
  );
}

export default TextMobileStepper;
