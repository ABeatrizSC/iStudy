'use client';

import { Container, Template, Title, Button, CustomTable, CustomTableCell, ConfirmationModal } from "@/components";
import { Checkbox, Input, TableBody, TableRow, Tabs, Tab } from "@mui/material";
import { Add, Delete, Edit, CalendarToday, ListAlt } from "@mui/icons-material";
import theme from "@/resources/assets/styles/Theme";
import { formatSavedDate } from "@/utils/formatters";
import { useEffect, useState } from "react";
import { useReminderByDate } from "@/hooks/reminder/useReminderByDate";
import { Reminder, ReminderRequest } from "@/resources/services/reminder/reminder.resource";
import { useCreateReminder } from "@/hooks/reminder/useCreateReminder";
import { useDeleteReminder } from "@/hooks/reminder/useDeleteReminder";
import { useUpdateReminder } from "@/hooks/reminder/useUpdateReminder";
import { useReminderData } from "@/hooks/reminder/useReminderData";

export default function Reminders() {
    const today = formatSavedDate(new Date());
    const [date, setDate] = useState<string>(today);
    const [newTask, setNewTask] = useState<string>("");
    const [tabIndex, setTabIndex] = useState(0);

    const { data: remindersByDate, isLoading: isRemindersByDateLoading } = useReminderByDate(date);
    const { data: allReminders, isLoading: isAllRemindersLoading } = useReminderData();

    const isLoading = isRemindersByDateLoading || isAllRemindersLoading;

    const [remindersCompleted, setRemindersCompleted] = useState<Reminder[]>(remindersByDate?.filter(r => r.isCompleted) || []);

    const [reminderSelected, setReminderSelected] = useState<Reminder>({
        id: "",
        createdBy: "",
        task: "",
        date: "",
        isCompleted: false
    })

    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState<boolean>(false);
    const [openConfirmCompletedModal, setOpenConfirmCompletedModal] = useState<boolean>(false);

    const createReminder = useCreateReminder();
    const deleteReminder = useDeleteReminder();
    const updateReminder = useUpdateReminder();

    useEffect(() => {
        const reminders = tabIndex == 0 ? allReminders?.filter(r => r.isCompleted) : remindersByDate?.filter(r => r.isCompleted);
        setRemindersCompleted(reminders || []);
    }, [allReminders, tabIndex]); 

    const handleCloseDeleteModal = () => setOpenConfirmDeleteModal(false);
    const handleCloseConfirmCompletedModal = () => setOpenConfirmCompletedModal(false);

    const handleCreateReminder = () => {
        const reminderRequest: ReminderRequest = { task: newTask, date: today, isCompleted: false };
        createReminder.mutate(reminderRequest, {
            onSuccess: () => setNewTask(""),
        });
    }
    
    const handleDeleteReminder = (id: string) => {
        deleteReminder.mutate(id, {
            onSuccess: () => {
                handleCloseDeleteModal();
            }
        })
    }

    const handleReminderCompleted = (reminder: Reminder) => {
        const reminderUpdated: ReminderRequest = { 
            task: reminder.task, 
            date: reminder.date, 
            isCompleted: !reminder.isCompleted 
        };

        updateReminder.mutate({ reminder: reminderUpdated, id: reminder.id }, {
            onSuccess: () => {
                setRemindersCompleted(remindersByDate?.filter(r => r.isCompleted) || []);
                handleCloseConfirmCompletedModal();
            }
        });
    };

    const handleEnter = (event: any) => {
        if (event.key === 'Enter') {
            handleCreateReminder();
        }
    };

    return (
        <Template loading={isLoading}>
            <Title>Reminders</Title>
            <Container style="overflow-y-auto text-center items-center gap-3">
                <h2 className="text-3xl mt-2">Task List</h2>
                <div className="flex gap-9 mt-3">
                    <div className="text-center flex items-center gap-2">
                        <span className="block bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center" style={{ color: theme.palette.primary.main }}>
                            {tabIndex === 0 ? allReminders?.length : remindersByDate?.length}
                        </span>
                        <span>All</span>
                    </div>
                    <div className="text-center flex items-center gap-2">
                        <span className="block bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center" style={{ color: theme.palette.primary.main }}>
                            {remindersCompleted?.length}
                        </span>
                        <span>Completed</span>
                    </div>
                </div>

                <div className="w-[200px] sm:w-[250px] md:w-[450px] bg-gray-200 rounded-[200px] mt-5">
                    <div className="w-full flex">
                        <Input 
                            value={newTask}
                            placeholder="New task"
                            disableUnderline
                            sx={{ 
                                width: '84%',
                                margin: '5px 0 5px 15px',
                            }}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => handleEnter(e)}
                        />
                        <Button 
                            style="!rounded-[200px]" 
                            onClick={handleCreateReminder}
                        >
                            <Add />
                        </Button>
                    </div>
                </div>

                <div className="w-full max-w-2xl mx-auto">
                    <Tabs 
                        value={tabIndex} 
                        onChange={(_, newValue) => setTabIndex(newValue)} 
                        centered 
                        sx={{ 
                            mt: 2, 
                            mb: 1,
                            minHeight: '48px',
                            '.MuiTabs-indicator': {
                                height: '3px',
                            },
                            '.MuiTab-root': {
                                minHeight: '48px',
                                paddingBottom: '8px',
                            }
                        }}
                    >
                        <Tab icon={<ListAlt />} iconPosition="start" label="All Tasks" />
                        <Tab icon={<CalendarToday />} iconPosition="start" label="Today's Tasks" />
                    </Tabs>
                </div>
                {tabIndex === 0 && allReminders?.length == 0 && <p>No reminders registered.</p>}
                {tabIndex === 1 && remindersByDate?.length == 0 && <p>No reminders registered.</p>}
                <CustomTable>
                    <TableBody>
                        {(tabIndex === 0 ? allReminders : remindersByDate)?.map((reminder, index) => (
                            <TableRow 
                                hover 
                                role="checkbox" 
                                tabIndex={-1} 
                                key={reminder.id}  
                                sx={{ 
                                    display: "flex", 
                                    alignItems: 'center',
                                    backgroundColor: reminder.isCompleted ? "#F0F0F0" : (index % 2 === 0 ? "#f9f9f9" : "#ffffff"),
                                    opacity: reminder.isCompleted ? 0.6 : 1, 
                                    transition: "background-color 0.3s ease-in-out, opacity 0.3s ease-in-out"
                                }} 
                            >
                                <CustomTableCell>
                                    <Checkbox 
                                        id={reminder.id} 
                                        color="primary" 
                                        checked={reminder.isCompleted} 
                                        onChange={() => {
                                            setReminderSelected(reminder);
                                            setOpenConfirmCompletedModal(true)
                                        }}
                                        size="small"
                                        sx={{ padding: 0 }}
                                    />
                                </CustomTableCell>
                                <CustomTableCell 
                                    sx={{ 
                                        flex: 2, 
                                        textDecoration: reminder.isCompleted ? 'line-through' : ''
                                    }}
                                >
                                    {reminder.task}
                                </CustomTableCell>
                                <CustomTableCell 
                                    sx={{ 
                                        display: 'flex', 
                                        gap: '25px', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        flexDirection: 'row' 
                                    }}
                                >
                                    <Button 
                                        style='!bg-transparent !px-0 !py-0'
                                        onClick={() => {
                                            setOpenConfirmDeleteModal(true);
                                            setReminderSelected(reminder);
                                        }}
                                    >
                                        <Delete sx={{ color: theme.palette.red.main, fontSize: '20px' }} />
                                    </Button>
                                </CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </CustomTable>
            </Container>
            <ConfirmationModal 
                title={`Delete '${reminderSelected.task}'?`}
                agreeText="Delete"
                description="This action cannot be reversed."
                handleClose={handleCloseDeleteModal}
                open={openConfirmDeleteModal}
                action={() => handleDeleteReminder(reminderSelected.id)}
            />
            <ConfirmationModal 
                title={`Update '${reminderSelected.task}' status?`}
                agreeText="Yes"
                handleClose={handleCloseConfirmCompletedModal}
                open={openConfirmCompletedModal}
                action={() => handleReminderCompleted(reminderSelected)}
            />
        </Template>
    );
}