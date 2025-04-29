'use client';

import { useState } from "react";
import { Container, Button, CustomTable, CustomTableCell, Template, Title } from "@/components";
import { useCreateSchedule } from "@/hooks/schedule/useCreateSchedule";
import { useDeleteSchedule } from "@/hooks/schedule/useDeleteSchedule";
import { useScheduleData } from "@/hooks/schedule/useScheduleData";
import { useUpdateSchedule } from "@/hooks/schedule/useUpdateSchedule";
import theme from "@/resources/assets/styles/Theme";
import { formatTime } from "@/utils/formatters";
import { Edit, Add, Delete } from "@mui/icons-material";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { dayOfWeek } from "@/constants/dayOfWeek";
import { ConfirmationModal, ScheduleItemModal } from "@/components/Modal";
import { ScheduleItem } from "@/resources/services/schedule-item/schedule.resource";

const columns = [
    { 
        id: 'dayOfWeek', 
        label: 'Day Of Week'
    },
    { 
        id: 'activity', 
        label: 'Activity'
    },
    { 
        id: 'startTime',
        label: 'Start time'
    },
    {
      id: 'endTime',
      label: 'End time',
    },
    {
      id: 'actions',
      label: 'Actions',
    }
];

export default function Schedules() {
    const { data: allSchedulesItems, isLoading: isAllSchedulesItemsLoading } = useScheduleData();
    const [itemSelected, setItemSelected] = useState<ScheduleItem>({
        id: "",
        createdBy: "",
        title: "",
        dayOfWeek: 0,
        startTime: "00:00",
        endTime: "00:00"
    });


    const createScheduleItem = useCreateSchedule();
    const updateScheduleItem = useUpdateSchedule();
    const deleteScheduleItem = useDeleteSchedule();

    
    const [openCreateModal, setOpenCreateModal]= useState<boolean>(false);
    const [openConfirmDeleteModal, setOpenConfirmDeleteModal]= useState<boolean>(false);
    const [openUpdateModal, setOpenUpdateModal]= useState<boolean>(false);
    
    const handleCloseDeleteModal = () => {
        setOpenConfirmDeleteModal(false)
    }

    const handleDeleteScheduleItem= (id: string) => {
        deleteScheduleItem.mutate(id, {
            onSuccess: () => handleCloseDeleteModal(),
        });
    }

    return (
    <Template loading={isAllSchedulesItemsLoading} >
        <Title>Schedule</Title>
        <Container style="overflow-y-auto text-center">
            <div className="flex justify-between items-center gap-5 mb-5">
                <h2>Weekly Planner</h2>
                <Button onClick={() => setOpenCreateModal(true)}>
                    <Add />
                </Button>
            </div>

            <CustomTable>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell
                                key={column.id}
                                align={"center"}
                                sx={{
                                    backgroundColor: 'transparent',
                                    borderBottom: 'none',
                                    padding: (index === 0) ? '0' : '0 0 0 3px'
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: 'white',
                                        padding: '6px 12px',
                                        borderTopLeftRadius: '12px',
                                        borderTopRightRadius: '12px',
                                        display: 'inline-block',
                                        whiteSpace: 'nowrap',
                                        width: "100%"
                                    }}
                                >
                                    {column.label}
                                </div>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dayOfWeek.map((day) => {
                        const itemsForDay = allSchedulesItems?.filter(schedule => schedule?.dayOfWeek === day.id)
                        ?.sort((a, b) => a.startTime.localeCompare(b.startTime));

                        if (itemsForDay?.length === 0) return null;

                        return itemsForDay?.map((item, index) => (
                            <TableRow key={item.id}>
                                {index === 0 && (
                                    <TableCell
                                        rowSpan={itemsForDay.length}
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            color: 'white',
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                            width: '100px'
                                        }}
                                    >
                                        {day.label}
                                    </TableCell>
                                )}
                                <TableCell align="center">{item.title}</TableCell>
                                <TableCell align="center">{formatTime(item.startTime)}</TableCell>
                                <TableCell align="center">{formatTime(item.endTime)}</TableCell>
                                <TableCell align="center">
                                    <div className="flex gap-4 justify-center">
                                        <Button 
                                            style='!bg-transparent !px-0 !py-0'
                                            onClick={() => {
                                                setItemSelected(item)
                                                setOpenUpdateModal(true)
                                            }}
                                        >
                                            <Edit 
                                                sx={{ color: theme.palette.primary.main, fontSize: '20px' }} 
                                            />
                                        </Button>
                                        <Button 
                                            style='!bg-transparent !px-0 !py-0'
                                            onClick={() => {
                                                setItemSelected(item)
                                                setOpenConfirmDeleteModal(true)
                                            }}
                                        >
                                            <Delete 
                                                sx={{ color: theme.palette.primary.main, fontSize: '20px' }} 
                                            />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ));
                    })}
                </TableBody>
            </CustomTable>
            {allSchedulesItems?.length == 0 && <p className="mt-3">No activity registered.</p>}
        </Container>

        <ScheduleItemModal 
            key={"create-modal"}
            title="Create a new activity"
            submitText="Create"
            open={openCreateModal}
            handleClose={() => setOpenCreateModal(false)}
            createAction={createScheduleItem}
        />
        <ScheduleItemModal 
            key={itemSelected.id}
            title="Update activity"
            submitText="Update"
            open={openUpdateModal}
            data={itemSelected}
            handleClose={() => setOpenUpdateModal(false)}
            updateAction={updateScheduleItem}
        />
        <ConfirmationModal
            title={`Delete activity '${itemSelected.title}'?`}
            description="This action cannot be reversed."
            agreeText="Delete"
            action={() => handleDeleteScheduleItem(itemSelected.id)}
            open={openConfirmDeleteModal}
            handleClose={() => handleCloseDeleteModal()}
        />
    </Template>
    );
}