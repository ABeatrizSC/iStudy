'use client'

import { useState } from "react";
import { Container, Template, Title, Button, FlashcardModal, ConfirmationModal, FlashcardGameModal, StartGameOptionsModal, FlashcardBox } from "@/components";
import { useCreateFlashcard } from "@/hooks/flashcard/useCreateFlashcard";
import { useFlashcardData } from "@/hooks/flashcard/useFlashcardData";
import { useUpdateFlashcard } from "@/hooks/flashcard/useUpdateFlashcard";
import { useDeleteFlashcard } from "@/hooks/flashcard/useDeleteFlashcard";
import { Flashcard } from "@/resources/services/flashcard/flashcard.resource";
import { Add } from "@mui/icons-material";
import { Input } from "@mui/material";

export default function Flashcards(){
    const [searchByTitle, setSearchByTitle] = useState<string>("");
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openGameModal, setOpenGameModal] = useState<boolean>(false);
    const [openStartOptionsModal, setOpenStartOptions] = useState<boolean>(false);

    const [flashcardSelected, setFlashcardSelected] = useState<Flashcard>({
        id: '',
        createdBy: '',
        title: '',
        cards: []
    })
    
    const { data: allFlashcards, isLoading: isAllFlashcardsLoading} = useFlashcardData();

    const allCardsSelected = allFlashcards?.find(f => f.id === flashcardSelected.id)?.cards;

    const flashcards = searchByTitle ? allFlashcards?.filter(f => f.title.toLowerCase().includes(searchByTitle.toLowerCase())) : allFlashcards;

    const createFlashcard = useCreateFlashcard();
    const updateFlashcard = useUpdateFlashcard();
    const deleteFlashcard = useDeleteFlashcard();

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false)
    }

    const handleDeleteFlashcard = (id: string) => {
        deleteFlashcard.mutate(id, {
            onSuccess: () => handleCloseDeleteModal(),
        })
    }

    const handleRetryIncorrects = () => {
        const incorrectAnswers = flashcardSelected.cards.filter(c => !c.isHit);
        
        const updatedCards = incorrectAnswers.length > 0
            ? incorrectAnswers
            : flashcardSelected.cards.map(card => ({ ...card, isHit: false }));
    
        setFlashcardSelected(prev => ({ ...prev, cards: updatedCards }));
        setOpenStartOptions(false);
        setOpenGameModal(true);
    };    
      
    const handleRestartGame = () => {
        const resetCards = flashcardSelected.cards.map(card => ({ ...card, isHit: false }));
        setFlashcardSelected(prev => ({ ...prev, cards: resetCards }));
        setOpenStartOptions(false);
        setOpenGameModal(true);
    };

    return(
        <Template loading={isAllFlashcardsLoading}>
            <Title>
                Flashcards
            </Title>
            <Container>
                <div className="flex flex-wrap flex-row items-center justify-center md:justify-between gap-5">
                    <div className="flex items-center flex-1">
                        <label htmlFor="searchByTitle" className="mr-2 text-nowrap">Search:</label>
                        <Input 
                            id="searchByTitle"
                            placeholder="Flashcard title" 
                            fullWidth={true} 
                            value={searchByTitle}
                            onChange={(event) => setSearchByTitle(event.target.value)}
                            sx={{ minWidth: '150px' }}
                        />
                    </div>
                    <Button style="!h-fit !py-2" onClick={() => setOpenCreateModal(true)}>
                        <Add />
                        New
                    </Button>
                </div>
            </Container>
            <Container style={"!grid !grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4"}>
                {flashcards?.length === 0 && (
                    <p className="w-full text-center">No flashcards registered</p>
                )}
                {flashcards?.map((flashcard, index) => (
                    <FlashcardBox 
                        key={index}
                        flashcardData={flashcard}
                        setFlashcardSelected={() => setFlashcardSelected(flashcard)}
                        openStartOptions={() => setOpenStartOptions(true)}
                        openUpdateModal={() => setOpenUpdateModal(true)}
                        openDeleteModal={() => setOpenDeleteModal(true)}
                    />
                ))}
            </Container>

            <FlashcardModal 
                modalTitle="Create flashcard"
                submitText="Create"
                createAction={createFlashcard}
                open={openCreateModal}
                handleClose={() => setOpenCreateModal(false)}
            />
            <FlashcardModal 
                key={flashcardSelected.id}
                modalTitle="Update flashcard"
                submitText="Update"
                updateAction={updateFlashcard}
                data={flashcardSelected}
                open={openUpdateModal}
                handleClose={() => setOpenUpdateModal(false)}
            />
            <ConfirmationModal 
                title={`Delete '${flashcardSelected.title}'?`}
                description="This action will permanently delete all linked cards."
                action={() => handleDeleteFlashcard(flashcardSelected.id)}
                open={openDeleteModal}
                handleClose={handleCloseDeleteModal}
                agreeText="Delete"
            />
            <FlashcardGameModal
                open={openGameModal}
                handleClose={() => setOpenGameModal(false)}
                cardData={flashcardSelected.cards} 
                allCards={Array.isArray(allCardsSelected) ? allCardsSelected : []}
                flashcardId={flashcardSelected.id}
            />
            <StartGameOptionsModal 
                open={openStartOptionsModal}
                handleClose={() => setOpenStartOptions(false)}
                restartAction={handleRestartGame}
                retryWrongAnswersAction={handleRetryIncorrects}
            />
        </Template>
    )
}