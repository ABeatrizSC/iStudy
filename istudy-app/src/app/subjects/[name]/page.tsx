'use client';

import { Container, Template, Title, Button, CustomTable, CustomTableCell, ConfirmationModal, CreateTopicModal, UpdateTopicModal, CategoryBox } from "@/components";
import { useSubjectByName } from "@/hooks/subject";
import { Checkbox, LinearProgress, TableBody, TableRow } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { Add, ArrowBack, Delete, Edit } from "@mui/icons-material";
import theme from "@/resources/assets/styles/Theme";
import { formatTime } from "@/utils/formatters";
import { useEffect, useState } from "react";
import { Topic, TopicUpdate } from "@/resources/services/topic/topic.resource";
import { useCreateTopic, useDeleteTopic, useUpdateTopic } from "@/hooks/topic";
import NotFoundPage from "@/app/not-found";

export default function SubjectDetail() {
    const router = useRouter();
    const { name: subjectName } = useParams<{ name: string }>(); 
    const [progressValue, setProgressValue] = useState<number>(0);
    const { data: subject, isLoading } = useSubjectByName(subjectName);
    const [topicsCompleted, setTopicsCompleted] = useState<Topic[]>(subject?.topics?.filter(topic => topic.isCompleted) || []);

    const [topicSelected, setTopicSelected] = useState<Topic>({
        id: "",
        name: "",
        time: "",
        isCompleted: false,
        discipline: null
    });
    
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState<boolean>(false);
    const [openConfirmCompletedModal, setOpenConfirmCompletedModal] = useState<boolean>(false);
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    
    const createTopic = useCreateTopic(subjectName);
    const deleteTopic = useDeleteTopic(subjectName);
    const updateTopic = useUpdateTopic(subjectName);

    useEffect(() => {
        setTopicsCompleted(subject?.topics?.filter(topic => topic.isCompleted) || []);
    }, [subject]); 

    useEffect(() => {
        const topics = subject?.topics?.length || 1;
        const progress = (topicsCompleted.length * 100) / topics;
        setProgressValue(progress);
    }, [topicsCompleted, subject]); 

    const handleCloseConfirmDeleteModal = () => {
        setOpenConfirmDeleteModal(false);
    }

    const handleCloseConfirmCompletedModal = () => {
        setOpenConfirmCompletedModal(false);
    }
    
    const handleDeleteTopic = (id: string) => {
        deleteTopic.mutate(id, {
            onSuccess: () => handleCloseConfirmDeleteModal(),
        });
    }
    
    const handleTopicCompleted = (topic: Topic) => {
        const topicUpdated: TopicUpdate = { name: topic.name, time: topic.time, isCompleted: !topic.isCompleted }

        updateTopic.mutate({ topic: topicUpdated, id: topic.id}, {
            onSuccess: () => {
                setTopicsCompleted(subject?.topics?.filter(topic => topic.isCompleted) || []);
                handleCloseConfirmCompletedModal();
            }
        })
    };
    
    if (!subject && !isLoading) return <NotFoundPage />

    return (
        <Template loading={isLoading}>
            <div className="flex gap-3">
                <Button onClick={() => router.push("/subjects")} style="!bg-transparent !p-0">
                    <ArrowBack 
                        sx={{ fill: theme.palette.primary.main }}
                        fontSize="large"
                    />
                </Button>
                <Title>
                {`Subjects/${subject?.name}`}
                </Title>
            </div>
            <Container style="gap-2">
                <div className="flex items-center gap-2">
                    <h2>{subject?.name}</h2>
                    <CategoryBox category={subject?.category ?? ""} />
                </div>
                <span>Total time: {formatTime(subject?.totalTime)}</span>
                <span>Time completed: {formatTime(subject?.timeCompleted)}</span>
                <span>Progress ({progressValue.toFixed(1)}%)</span>
                <LinearProgress 
                variant="determinate" 
                value={progressValue} 
                sx={{ height: '15px', borderRadius: "20px"}}
            />
            </Container>
            <Container style="overflow-y-auto">
                <div className="flex justify-between items-center gap-5">
                    <h2>Topics</h2>
                    <Button onClick={() => setOpenCreateModal(true)}>
                        <Add />
                    </Button>
                </div>
                <p className="mb-3" style={{ color: theme.palette.text.secondary}}>
                    {topicsCompleted?.length ?? 0} of {subject?.topics?.length} topics complete 
                </p>
                <CustomTable>
                    <TableBody>
                        {subject?.topics?.map((topic, index) => (
                            <TableRow 
                                hover 
                                role="checkbox" 
                                tabIndex={-1} 
                                key={topic.id}  
                                sx={{ 
                                    display: "flex", 
                                    alignItems: 'center',
                                    backgroundColor: topic.isCompleted ? "#F0F0F0" : (index % 2 === 0 ? "#f9f9f9" : "#ffffff"),
                                    opacity: topic.isCompleted ? 0.6 : 1, 
                                    transition: "background-color 0.3s ease-in-out, opacity 0.3s ease-in-out"
                                }} 
                            >
                                <CustomTableCell>
                                    <Checkbox 
                                        id={topic.id} 
                                        color="primary" 
                                        checked={topic.isCompleted} 
                                        onChange={() => {
                                            setTopicSelected(topic)
                                            setOpenConfirmCompletedModal(true)
                                        }}
                                        size="small"
                                        sx={{ padding: 0}}
                                    />
                                </CustomTableCell>
                                <CustomTableCell sx={{ flex: 2 }}>
                                    {topic.name}
                                </CustomTableCell>
                                <CustomTableCell sx={{ flex: 1 }}>
                                    {formatTime(topic.time)}
                                </CustomTableCell>
                                <CustomTableCell sx={{ display: 'flex', gap: '25px', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                    <Button 
                                        style='!bg-transparent !px-0 !py-0'
                                        onClick={() => {
                                            setOpenUpdateModal(true)
                                            setTopicSelected(topic)
                                        }}
                                    >
                                        <Edit sx={{ color: theme.palette.primary.main, fontSize: '20px' }} />
                                    </Button>
                                    <Button 
                                        style='!bg-transparent !bg-transparent !px-0 !py-0'
                                        onClick={() => {
                                            setOpenConfirmDeleteModal(true)
                                            setTopicSelected(topic)
                                        }}
                                    >
                                        <Delete sx={{ color: theme.palette.primary.main, fontSize: '20px' }} />
                                    </Button>
                                </CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </CustomTable>
            </Container>
            <CreateTopicModal 
                data={topicSelected}
                subjectId={subject?.id ?? ""}
                action={createTopic}
                open={openCreateModal}
                handleClose={() => setOpenCreateModal(false)}
            />
            <UpdateTopicModal
                data={topicSelected}
                action={updateTopic}
                open={openUpdateModal}
                handleClose={() => setOpenUpdateModal(false)}
            />
            <ConfirmationModal 
                title={`Delete topic '${topicSelected.name}'?`} 
                description="If you proceed, the topic and all linked studies will be permanently deleted. Are you sure you want to delete them?"
                agreeText="Delete"
                action={() => handleDeleteTopic(topicSelected.id)}
                open={openConfirmDeleteModal}
                handleClose={handleCloseConfirmDeleteModal}
            />
            <ConfirmationModal 
                title={`Change topic '${topicSelected.name}' status?`} 
                description="You will be able to change it again."
                agreeText="Change"
                action={() => handleTopicCompleted(topicSelected)}
                open={openConfirmCompletedModal}
                handleClose={handleCloseConfirmCompletedModal}
            />
        </Template>
    )
}