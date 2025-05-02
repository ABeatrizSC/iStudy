'use client'

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { DialogContent, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { forwardRef, useEffect, useState } from 'react';
import SwiperCore from 'swiper';
import { Card, CardAnswer, FlashcardAnswer } from '@/resources/services/flashcard/flashcard.resource';
import { useAnswerFlashcard } from '@/hooks/flashcard/useAnswerFlashcard';
import { mapCardToCardAnswer } from '@/utils/mappers';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import theme from '@/resources/assets/styles/Theme';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Button, CardBox, Title } from '..';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface FlashcardGameModalProps {
  cardData: Card[],
  allCards: Card[],
  flashcardId: string,
  open: boolean,
  handleClose: () => void
}

export const FlashcardGameModal: React.FC<FlashcardGameModalProps> = ({ cardData, allCards, flashcardId, open, handleClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  
  const [cards, setCards] = useState<Card[]>(cardData);
  
  useEffect(() => {
    setShowResult(false)
    setCards(cardData);
  }, [open, cardData]);

  const answerFlashcard = useAnswerFlashcard();
  const totalCorrect = cards.filter((c) => c.isHit).length;
  const totalIncorrect = cards.filter((c) => !c.isHit).length;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  }

  const handleSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.activeIndex);
    setIsFlipped(false); 
  };

  const handleIsHitChange = (id: string) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, isHit: !card.isHit } : card
      )
    );
  };

  const handleRetryIncorrects = () => {
    const incorrectAnswers: Card[] = cards.filter(c => !c.isHit);
    setCards(incorrectAnswers);
    setShowResult(false);
  }

  const handleRestartGame = () => {
    const resetAllCards = allCards.map(card => ({ ...card, isHit: false }));
    setCards(resetAllCards);
    setShowResult(false);
  }

  const handleCloseAndSaveFlashcard = () => {
    const cardsAnswered: CardAnswer[] = cards.map((c) => mapCardToCardAnswer(c));
    const flashcardAnswer: FlashcardAnswer = { cardsAnswer: cardsAnswered };
  
    answerFlashcard.mutate({ flashcardId: flashcardId, flashcard: flashcardAnswer });
    handleClose();
  };
  
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleCloseAndSaveFlashcard}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Button onClick={handleCloseAndSaveFlashcard}>
            <CloseIcon fontSize='large' />
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        { !showResult ? <>
          <Title>
            Flashcard Game
          </Title>
          <Swiper
            effect={'cards'}
            grabCursor={true}
            onSlideChange={handleSlideChange}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {cards.map((card, index) => (
              <SwiperSlide  key={`${card.id}-${isFlipped}`}>
                <CardBox 
                  key={index}
                  cardData={card}
                  isFlipped={isFlipped}
                  handleFlip={handleFlip}
                  handleIsHitChange={() => handleIsHitChange(card.id)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {(cards.length === 1 || activeIndex === cards.length - 1) && (
            <Button color="red" style='mt-5' onClick={() => setShowResult(true)}>
              See result
            </Button>
          )}

        </> : <>
          <Title>GAME RESULT</Title>
          <div className="w-[300px] h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Correct answers', value: totalCorrect },
                    { name: 'Wrong answers', value: totalIncorrect },
                  ]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}    
                  outerRadius={100}
                  paddingAngle={5}
                  cornerRadius={4}
                  fill={theme.palette.primary.main}
                >
                  <Cell fill={theme.palette.green.main} /> 
                  <Cell fill={theme.palette.red.main} />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <Typography variant="h4" >
            {totalCorrect + "/" + cards.length}
          </Typography>
          <div className='w-full mt-5 flex gap-7 items-center justify-center'>
            <div className='flex gap-4 w-fit'>
              <div className='h-6 w-6 rounded-md' style={{ backgroundColor: theme.palette.green.main }}></div>
              <span>Correct answers</span>
            </div>
            <div className='flex gap-4 w-fit'>
              <div className='h-6 w-6 rounded-md' style={{ backgroundColor: theme.palette.red.main }}></div>
              <span>Wrong answers</span>
            </div>
          </div>
          <div className='flex gap-5 mt-8'>
            {totalIncorrect > 0 &&           
              <Button onClick={handleRetryIncorrects}>
                Retry incorrect answers
              </Button>  
            }
            <Button style='!bg-transparent !text-red-500 !px-0 !py-0' onClick={handleRestartGame}>
              Restart game
            </Button>
          </div>
        </>}
      </DialogContent>
    </Dialog>
  );
};
